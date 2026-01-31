<template>
  <div class="table-container">
    <div class="table">
      <el-table
        id="iTable"
        ref="iTableRef"
        :data="tableData"
        v-bind="options"
        height="100%"
        style="width: 100%"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <template v-for="(column, index) in newTableHeader">
          <el-table-column
            v-if="column && (typeof column.show === 'function' ? column.show() : column.show !== false)"
            :key="index + 'column'"
            :min-width="headSpanFit(column)"
            v-bind="column"
          >
            <template v-for="(value, key) in column.slot" #[key]="scope">
              <slot :name="value" v-bind="scope">
                <div v-if="column.render && String(key) === 'default'" :key="index + 'inner'">
                  <div v-if="typeof column.render === 'string'" v-html="column.render"></div>
                  <component v-else :is="column.render" v-bind="scope"></component>
                </div>
              </slot>
            </template>

            <template v-if="!column.slot" #default="scope">
              <!-- 处理 render 函数 -->
              <template v-if="column.render">
                <!-- 如果 render 返回的是函数结果 (VNode 或 字符串) -->
                <div
                  v-if="
                    typeof (typeof column.render === 'function' ? column.render(scope) : column.render) === 'string'
                  "
                >
                  <div v-html="typeof column.render === 'function' ? column.render(scope) : column.render"></div>
                </div>
                <component v-else :is="column.render" v-bind="scope" :row="scope.row" :index="scope.$index"></component>
              </template>

              <!-- 处理 formatter -->
              <template v-else-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>

              <!-- 默认显示 -->
              <template v-else-if="!column.type">
                <span>{{ scope.row[column.prop] === 0 ? 0 : scope.row[column.prop] || "--" }}</span>
              </template>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          v-if="operates.list && operates.list.length > 0"
          label="操作"
          align="left"
          :width="operates.width"
          :fixed="operates.fixed"
        >
          <template #default="scope">
            <div class="operate-group">
              <template v-for="(item, idx) in getVisibleButtons(scope.row).outside" :key="idx">
                <el-button
                  :type="item.type || 'primary'"
                  :plain="item.plain || false"
                  :link="item.link || false"
                  :size="item.size || 'small'"
                  :color="item.color"
                  @click.stop="item.method(scope.row, scope.$index)"
                >
                  {{ item.label }}
                  <el-icon v-if="item.icon" class="el-icon--right">
                    <component :is="item.icon" />
                  </el-icon>
                </el-button>
              </template>

              <el-dropdown v-if="getVisibleButtons(scope.row).inside.length" class="custom-dropdown" trigger="click">
                <el-button link size="small" class="custom-text">
                  <el-icon style="font-size: 18px"><component :is="MoreFilled" /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, idx) in getVisibleButtons(scope.row).inside"
                      :key="idx"
                      @click="item.method(scope.row, scope.$index)"
                    >
                      {{ item.label }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div :class="{ hidden: hidden }" class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="background"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUpdate, useSlots, defineOptions } from "vue"
import { MoreFilled } from "@element-plus/icons-vue"
import { scrollTo } from "./scrollTo"

defineOptions({
  name: "EasyTable"
})

/* 使用 JS 对象声明 Props，不使用 TS 类型声明 */
const props = defineProps({
  columns: { type: Array, default: () => [] },
  tableData: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  options: {
    type: Object,
    default: () => ({
      stripe: false,
      highlightCurrentRow: false,
      mutiSelect: false,
      border: true
    })
  },
  limit: { type: Number, default: 20 },
  pageSizes: { type: Array, default: () => [10, 20, 30, 50] },
  pagerCount: { type: Number, default: document.body.clientWidth < 992 ? 5 : 7 },
  layout: { type: String, default: "total, sizes, prev, pager, next, jumper" },
  background: { type: Boolean, default: true },
  autoScroll: { type: Boolean, default: true },
  hidden: { type: Boolean, default: false },
  operates: { type: Object, default: () => ({ list: [] }) }
})

const emit = defineEmits(["update:page", "update:limit", "pagination", "sortChange", "handleSelectionChange"])

const slots = useSlots()
const newTableHeader = ref([])
const iTableRef = ref(null)

/* 表头宽度自适应 */
function headSpanFit(column) {
  const labelLong = column?.label?.length || 0
  const size = 20
  return labelLong * size < 100 ? 100 : labelLong * size
}

/* 生成表头逻辑 */
function genNewTableHeader() {
  // 浅拷贝 props.columns 避免直接修改
  const tempHeaders = [...props.columns]

  tempHeaders.forEach(column => {
    if (typeof column !== "object") return
    if (!column.key) column.key = column.prop

    const slotKeys = Object.keys(slots)
    slotKeys.forEach(key => {
      const res = key.match(/^(\S+)-(\S+)/)
      if (res && res[2] === column.key) {
        if (!column.slot) column.slot = {}
        column.slot[res[1]] = res[0]
      }
    })
  })
  newTableHeader.value = tempHeaders
}

/* 操作按钮逻辑计算 */
function getVisibleButtons(row) {
  const list = (props.operates?.list || []).filter(item => {
    if (typeof item.show === "function") return item.show(row)
    return item.show !== false
  })

  if (list.length > 3) {
    return {
      outside: list.slice(0, 2),
      inside: list.slice(2)
    }
  }
  return { outside: list, inside: [] }
}

/* 分页逻辑 */
const currentPage = computed({
  get: () => props.page,
  set: val => emit("update:page", val)
})

const pageSize = computed({
  get: () => props.limit,
  set: val => emit("update:limit", val)
})

function handleSizeChange(val) {
  if (currentPage.value * val > props.total) {
    currentPage.value = 1
  }
  emit("pagination", { page: currentPage.value, limit: val })
  props.autoScroll && scrollTo(0, 800)
}

function handleCurrentChange(val) {
  emit("pagination", { page: val, limit: pageSize.value })
  props.autoScroll && scrollTo(0, 800)
}

function sortChange({ column, prop, order }) {
  emit("sortChange", { column, prop, order })
}

function handleSelectionChange(val) {
  emit("handleSelectionChange", val)
}

onMounted(genNewTableHeader)
onBeforeUpdate(genNewTableHeader)

defineExpose({ iTableRef })
</script>

<style scoped lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 400px;

  .table {
    flex: 1;
    position: relative;
    height: 100%;
    :deep(.el-table) {
      position: absolute;
    }
  }
}

.pagination-container {
  padding: 16px 0;
  &.hidden {
    display: none;
  }
}

.operate-group {
  display: flex;
  align-items: center;

  .el-button + .el-button,
  .el-button + .custom-dropdown {
    margin-left: 16px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 12px;
      background-color: #dcdfe6;
    }
  }

  :deep(.custom-text) {
    color: #606266;
    padding: 0;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
