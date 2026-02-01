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
        <template v-for="(column, index) in processedHeaders" :key="index + (column.prop || '')">
          <el-table-column v-if="isColumnVisible(column)" :min-width="headSpanFit(column)" v-bind="column">
            <!-- 渲染插槽  key是el-table-column插槽名称, value 是传递的插槽名称 -->
            <template v-for="(value, key) in column.slot" #[key]="scope">
              <slot :name="value" v-bind="scope"> </slot>
            </template>

            <!-- 渲染默认内容 无插槽 -->
            <template v-if="!column.slot" #default="scope">
              <!-- 渲染render -->
              <template v-if="column.render">
                <!-- 如果render返回的是字符串 -->
                <div v-if="typeof getRenderContent(column, scope) === 'string'">
                  <div v-html="getRenderContent(column, scope)"></div>
                </div>
                <!-- 如果render返回的是组件 -->
                <component v-else :is="column.render" v-bind="scope" :row="scope.row" :index="scope.$index" />
              </template>

              <!-- 渲染formatter -->
              <template v-else-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>

              <!-- 渲染默认内容 -->
              <template v-else-if="!column.type">
                <span>{{ scope.row[column.prop] ?? "--" }}</span>
              </template>
            </template>
          </el-table-column>
        </template>

        <!-- 操作列 -->
        <el-table-column
          v-if="operates.list?.length"
          label="操作"
          align="left"
          :width="operates.width"
          :fixed="operates.fixed"
        >
          <template #default="scope">
            <div class="operate-group">
              <!-- 渲染外部按钮 -->
              <template v-for="(item, idx) in getVisibleButtons(scope.row).outside" :key="idx">
                <el-button
                  v-bind="item"
                  :type="item.type || 'primary'"
                  :size="item.size || 'small'"
                  @click.stop="item.method(scope.row, scope.$index)"
                >
                  {{ item.label }}
                  <el-icon v-if="item.icon" class="el-icon--right">
                    <component :is="item.icon" />
                  </el-icon>
                </el-button>
              </template>

              <!-- 渲染下拉按钮 -->
              <el-dropdown v-if="getVisibleButtons(scope.row).inside.length" class="custom-dropdown" trigger="click">
                <el-button link size="small" class="custom-text">
                  <el-icon :size="18"><MoreFilled /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, idx) in getVisibleButtons(scope.row).inside"
                      :key="idx"
                      v-bind="item"
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

    <!-- 分页 -->
    <div v-if="!hidden" class="pagination-container" :style="{ justifyContent: paginationJustify }">
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
import { computed, ref, useSlots, watch } from "vue"
import { MoreFilled } from "@element-plus/icons-vue"
import { scrollTo } from "./scrollTo"

defineOptions({ name: "EasyTable" })

const props = defineProps({
  columns: { type: Array, default: () => [] },
  tableData: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  options: {
    type: Object,
    default: () => ({ stripe: false, highlightCurrentRow: false, border: true })
  },
  limit: { type: Number, default: 20 },
  pageSizes: { type: Array, default: () => [10, 20, 30, 50] },
  pagerCount: { type: Number, default: document.body.clientWidth < 992 ? 5 : 7 },
  layout: { type: String, default: "total, sizes, prev, pager, next, jumper" },
  background: { type: Boolean, default: true },
  autoScroll: { type: Boolean, default: true },
  hidden: { type: Boolean, default: false },
  operates: { type: Object, default: () => ({ list: [] }) },
  paginationPosition: { type: String, default: "right" }
})

const emit = defineEmits(["update:page", "update:limit", "pagination", "sortChange", "handleSelectionChange"])

const slots = useSlots()
const iTableRef = ref(null)
const processedHeaders = ref([])

/** 1. 逻辑优化：使用 watch 监听 columns 变化，避免在 onBeforeUpdate 中过度计算 **/
watch(
  () => [props.columns, slots],
  () => {
    processedHeaders.value = props.columns.map(column => {
      const col = { ...column }
      if (!col.key) col.key = col.prop

      // 匹配插槽逻辑保持不变
      Object.keys(slots).forEach(key => {
        const res = key.match(/^(\S+)-(\S+)/)

        if (res && res[2] === col.key) {
          col.slot = { ...col.slot, [res[1]]: res[0] }
        }
      })

      return col
    })
  },
  { immediate: true, deep: true }
)

/** 2. 工具函数 **/

// 计算表头宽度
const headSpanFit = column => {
  const labelLen = column?.label?.length || 0
  return Math.max(labelLen * 20, 100)
}

// 判断列是否显示
const isColumnVisible = column => {
  if (typeof column.show === "function") return column.show()
  return column.show !== false
}

// 获取渲染内容
const getRenderContent = (column, scope) => {
  return typeof column.render === "function" ? column.render(scope) : column.render
}

// 获取可见按钮
const getVisibleButtons = row => {
  const list = (props.operates?.list || []).filter(item => {
    return typeof item.show === "function" ? item.show(row) : item.show !== false
  })
  return list.length > 3
    ? {
        outside: list.slice(0, 2),
        inside: list.slice(2)
      }
    : {
        outside: list,
        inside: []
      }
}

/** 3. 分页计算属性 **/
// 当前页码
const currentPage = computed({
  get: () => props.page,
  set: val => emit("update:page", val)
})

// 每页条数
const pageSize = computed({
  get: () => props.limit,
  set: val => emit("update:limit", val)
})

// 分页对齐方式
const paginationJustify = computed(() => {
  const map = { left: "flex-start", center: "center", right: "flex-end" }
  return map[props.paginationPosition] || "flex-end"
})

/** 4. 事件处理 **/
// 改变每页条数
const handleSizeChange = val => {
  if (currentPage.value * val > props.total) currentPage.value = 1
  emit("pagination", { page: currentPage.value, limit: val })
  if (props.autoScroll) scrollTo(0, 800)
}

// 改变当前页
const handleCurrentChange = val => {
  emit("pagination", { page: val, limit: pageSize.value })
  if (props.autoScroll) scrollTo(0, 800)
}

// 改变排序
const sortChange = args => emit("sortChange", args)

// 改变选择
const handleSelectionChange = val => emit("handleSelectionChange", val)

defineExpose({ iTableRef })
</script>

<style scoped lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 400px;

  .table {
    flex: 1;
    position: relative;
    :deep(.el-table) {
      position: absolute;
      height: 100%;
    }
  }
}

.pagination-container {
  padding: 16px 0;
  display: flex;
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
