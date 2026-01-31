<script setup>
import { h, ref, computed } from "vue"
import { ElTag, ElMessage } from "element-plus"
import { EasyTable } from "easy-elplus"
import { Edit, Delete, View } from "@element-plus/icons-vue"

// 表格引用
const tableRef = ref(null)

// 模拟数据
const tableData = ref([
  {
    date: "2016-05-03",
    name: "远方os",
    gender: 1,
    age: 35,
    city: "北京",
    course: "Vue源码课",
    price: 699,
    status: 1
  },
  {
    date: "2016-05-02",
    name: "近圆os",
    gender: 0,
    age: 45,
    city: "上海",
    course: "React进阶",
    price: 999,
    status: 0
  },
  {
    date: "2016-05-04",
    name: "远万os",
    gender: 1,
    age: 25,
    city: "杭州",
    course: "Node核心",
    price: 1398,
    status: 1
  }
])

// 分页配置
const page = ref(1)
const limit = ref(10)
const total = ref(100)

// 列配置
const columns = computed(() => [
  // 1. 多选
  { type: "selection", width: 50 },
  // 2. 序号
  { type: "index", label: "序号", width: 60, align: "center" },
  // 3. 普通列
  { prop: "date", label: "日期", width: 120 },
  // 4. 插槽列 (使用最新语法: [type]-[prop])
  { prop: "name", label: "姓名", width: 120, key: "name" },
  // 5. 渲染函数列
  {
    prop: "gender",
    label: "性别",
    width: 80,
    render: ({ row }) => h(ElTag, { type: row.gender ? "primary" : "danger" }, () => (row.gender ? "男" : "女"))
  },
  // 6. 字符串渲染 (HTML)
  {
    prop: "age",
    label: "年龄",
    width: 80,
    render: ({ row }) => `<b style="color: #409eff">${row.age} 岁</b>`
  },
  // 7. 格式化列 (formatter)
  {
    prop: "status",
    label: "状态",
    width: 100,
    formatter: row => (row.status ? "<span style='color: green'>正常</span>" : "<span style='color: red'>禁用</span>")
  },
  { prop: "city", label: "城市" },
  // 8. 价格列
  {
    prop: "price",
    label: "价格",
    formatter: row => `¥ ${row.price.toFixed(2)}`
  }
])

// 操作按钮配置
const operates = {
  width: 250,
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
      show: row => row.status === 1, // 条件显示
      method: row => {
        console.log("查看详情:", row)
      }
    },
    {
      label: "删除",
      type: "danger",
      icon: Delete,
      confirm: true, // 更多按钮演示
      method: row => {
        ElMessage.error(`删除: ${row.name}`)
      }
    },
    {
      label: "更多选项1",
      method: row => console.log("更多1", row)
    },
    {
      label: "更多选项2",
      method: row => console.log("更多2", row)
    }
  ]
}

// 事件处理
const handleSelectionChange = val => {
  console.log("选中项变化:", val)
}

const onPagination = ({ page, limit }) => {
  ElMessage.success(`分页变化: 第${page}页, 每页${limit}条`)
}
</script>

<template>
  <div style="padding: 20px; height: 600px; display: flex; flex-direction: column">
    <h3>EasyTable 最新功能演示</h3>

    <EasyTable
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
      @handleSelectionChange="handleSelectionChange"
      @pagination="onPagination"
    >
      <!-- 使用新语法定义插槽: [类型]-[key/prop] -->
      <!-- header-name 定义姓名列的表头 -->
      <template #header-name="{ column }">
        <el-tag effect="dark">自定义 {{ column.label }}</el-tag>
      </template>

      <!-- default-name 定义姓名列的内容 -->
      <template #default-name="{ row }">
        <span style="font-weight: bold; color: #67c23a">{{ row.name }}</span>
      </template>
    </EasyTable>

    <div style="margin-top: 20px">
      <p>当前页码: {{ page }} | 每页条数: {{ limit }}</p>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-table) {
  margin-top: 10px;
}
</style>
