<template>
  <div class="table-demo">
    <easy-table
      ref="tableRef"
      :table-data="tableData"
      :columns="columns"
      :operates="operates"
      :total="total"
      v-model:page="page"
      v-model:limit="limit"
      :options="{
        border: true,
        stripe: true,
        highlightCurrentRow: true
      }"
      :auto-scroll="false"
      pagination-position="right"
      @handleSelectionChange="handleSelectionChange"
      @pagination="onPagination"
    >
      <!-- 自定义表头 -->
      <template #header-name="{ column }">
        <el-tag effect="dark" size="small">{{ column.label }}</el-tag>
      </template>

      <!-- 自定义内容 -->
      <template #default-name="{ row }">
        <span style="font-weight: bold; color: #67c23a">{{ row.name }}</span>
      </template>
    </easy-table>

    <div v-if="selectedRows.length" class="selection-info">
      <strong>已选择：</strong>{{ selectedRows.length }} 条数据
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed } from "vue"
import { ElTag, ElMessage } from "element-plus"
import { EasyTable } from "easy-elplus"
import { Edit, Delete, View } from "@element-plus/icons-vue"

const selectedRows = ref([])

// 模拟数据
const tableData = ref([
  {
    date: "2024-01-15",
    name: "张三",
    gender: 1,
    age: 28,
    city: "北京",
    status: 1,
    price: 1299
  },
  {
    date: "2024-01-16",
    name: "李四",
    gender: 0,
    age: 32,
    city: "上海",
    status: 0,
    price: 999
  },
  {
    date: "2024-01-17",
    name: "王五",
    gender: 1,
    age: 25,
    city: "深圳",
    status: 1,
    price: 1599
  },
  {
    date: "2024-01-18",
    name: "赵六",
    gender: 0,
    age: 30,
    city: "杭州",
    status: 1,
    price: 899
  }
])

const page = ref(1)
const limit = ref(10)
const total = ref(30)

// 列配置
const columns = computed(() => [
  { type: "selection", width: 50 },
  { type: "index", label: "序号", width: 60, align: "center" },
  { prop: "date", label: "日期", width: 120 },
  { prop: "name", label: "姓名", width: 120, key: "name" },
  {
    prop: "gender",
    label: "性别",
    width: 80,
    render: ({ row }) =>
      h(ElTag, { type: row.gender ? "primary" : "danger", size: "small" }, () => (row.gender ? "男" : "女"))
  },
  {
    prop: "age",
    label: "年龄",
    width: 80,
    render: ({ row }) => `<b style="color: #409eff">${row.age} 岁</b>`
  },
  {
    prop: "status",
    label: "状态",
    width: 100,
    formatter: row => (row.status ? "<span style='color: green'>正常</span>" : "<span style='color: red'>禁用</span>")
  },
  { prop: "city", label: "城市", width: 100 },
  {
    prop: "price",
    label: "价格",
    formatter: row => `¥ ${row.price.toFixed(2)}`
  }
])

// 操作按钮配置
const operates = {
  width: 200,
  fixed: "right",
  list: [
    {
      label: "编辑",
      type: "primary",
      icon: Edit,
      method: (row, index) => {
        ElMessage.info(`编辑第 ${index + 1} 行: ${row.name}`)
      }
    },
    {
      label: "查看",
      type: "success",
      icon: View,
      show: row => row.status === 1,
      method: row => {
        ElMessage.success(`查看: ${row.name}`)
      }
    },
    {
      label: "删除",
      type: "danger",
      icon: Delete,
      confirm: true,
      method: row => {
        ElMessage.error(`删除: ${row.name}`)
      }
    }
  ]
}

// 事件处理
const handleSelectionChange = val => {
  selectedRows.value = val
}

const onPagination = ({ page: p, limit: l }) => {
  ElMessage.success(`分页变化: 第${p}页, 每页${l}条`)
}
</script>

<style scoped>
.selection-info {
  margin-top: 15px;
  padding: 10px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #409eff;
  font-size: 14px;
}
</style>
