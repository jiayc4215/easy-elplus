---
title: Table 表格
description: 增强的表格组件,支持多级表头、操作列、渲染函数等
---

# Table 表格

EasyTable 是基于 Element Plus Table 组件封装的增强版本,提供了更便捷的配置方式和丰富的功能。

## 在线演示

<preview path="../demo/table-basic.vue" title="Table 基础示例" description="展示 Table 组件的各种用法"></preview>

## 基础用法

```vue
<template>
  <easy-table :table-data="tableData" :columns="columns" :total="total" v-model:page="page" v-model:limit="limit" />
</template>

<script setup>
import { ref } from "vue"
import { EasyTable } from "easy-elplus"

const tableData = ref([
  { date: "2016-05-03", name: "张三", age: 18 },
  { date: "2016-05-02", name: "李四", age: 25 },
  { date: "2016-05-04", name: "王五", age: 30 }
])

const columns = ref([
  { prop: "date", label: "日期", width: 120 },
  { prop: "name", label: "姓名", width: 120 },
  { prop: "age", label: "年龄", width: 80 }
])

const page = ref(1)
const limit = ref(10)
const total = ref(100)
</script>
```

## 特殊列类型

### 多选列和序号列

```javascript
const columns = [
  { type: "selection", width: 50 }, // 多选列
  { type: "index", label: "序号", width: 60 }, // 序号列
  { prop: "name", label: "姓名" }
]
```

## 渲染函数

支持使用渲染函数自定义列内容:

```javascript
import { h } from "vue"
import { ElTag } from "element-plus"

const columns = [
  {
    prop: "gender",
    label: "性别",
    render: ({ row }) => h(ElTag, { type: row.gender ? "primary" : "danger" }, () => (row.gender ? "男" : "女"))
  },
  {
    prop: "age",
    label: "年龄",
    render: ({ row }) => `<b style="color: #409eff">${row.age} 岁</b>`
  }
]
```

## Formatter 格式化

使用 formatter 函数格式化列内容:

```javascript
const columns = [
  {
    prop: "status",
    label: "状态",
    formatter: row => (row.status ? "正常" : "禁用")
  },
  {
    prop: "price",
    label: "价格",
    formatter: row => `¥ ${row.price.toFixed(2)}`
  }
]
```

## 插槽自定义

使用插槽自定义表头和内容:

```vue
<template>
  <easy-table :table-data="tableData" :columns="columns">
    <!-- 自定义表头 -->
    <template #header-name="{ column }">
      <el-tag>{{ column.label }}</el-tag>
    </template>

    <!-- 自定义内容 -->
    <template #default-name="{ row }">
      <span style="font-weight: bold">{{ row.name }}</span>
    </template>
  </easy-table>
</template>

<script setup>
const columns = [
  { prop: "name", label: "姓名", key: "name" } // 需要设置 key
]
</script>
```

## 操作列

配置操作列按钮:

```javascript
import { Edit, Delete, View } from "@element-plus/icons-vue"

const operates = {
  width: 250,
  fixed: "right",
  list: [
    {
      label: "编辑",
      type: "primary",
      icon: Edit,
      method: (row, index) => {
        console.log("编辑", row, index)
      }
    },
    {
      label: "查看",
      type: "success",
      icon: View,
      show: row => row.status === 1, // 条件显示
      method: row => {
        console.log("查看", row)
      }
    },
    {
      label: "删除",
      type: "danger",
      icon: Delete,
      confirm: true, // 更多按钮中显示
      method: row => {
        console.log("删除", row)
      }
    }
  ]
}
```

```vue
<template>
  <easy-table :table-data="tableData" :columns="columns" :operates="operates" />
</template>
```

## 完整示例

```vue
<template>
  <div style="padding: 20px; height: 600px">
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
      pagination-position="right"
      @handleSelectionChange="handleSelectionChange"
      @pagination="onPagination"
    >
      <template #header-name="{ column }">
        <el-tag effect="dark">自定义 {{ column.label }}</el-tag>
      </template>

      <template #default-name="{ row }">
        <span style="font-weight: bold; color: #67c23a">{{ row.name }}</span>
      </template>
    </easy-table>
  </div>
</template>

<script setup>
import { h, ref, computed } from "vue"
import { ElTag, ElMessage } from "element-plus"
import { EasyTable } from "easy-elplus"
import { Edit, Delete, View } from "@element-plus/icons-vue"

const tableData = ref([
  {
    date: "2016-05-03",
    name: "张三",
    gender: 1,
    age: 35,
    status: 1,
    price: 699
  }
])

const columns = computed(() => [
  { type: "selection", width: 50 },
  { type: "index", label: "序号", width: 60 },
  { prop: "date", label: "日期", width: 120 },
  { prop: "name", label: "姓名", width: 120, key: "name" },
  {
    prop: "gender",
    label: "性别",
    width: 80,
    render: ({ row }) => h(ElTag, { type: row.gender ? "primary" : "danger" }, () => (row.gender ? "男" : "女"))
  },
  {
    prop: "status",
    label: "状态",
    formatter: row => (row.status ? "正常" : "禁用")
  },
  {
    prop: "price",
    label: "价格",
    formatter: row => `¥ ${row.price.toFixed(2)}`
  }
])

const operates = {
  width: 250,
  fixed: "right",
  list: [
    {
      label: "编辑",
      type: "primary",
      icon: Edit,
      method: (row, index) => {
        ElMessage.info(`编辑第 ${index + 1} 行`)
      }
    },
    {
      label: "删除",
      type: "danger",
      icon: Delete,
      method: row => {
        ElMessage.error(`删除: ${row.name}`)
      }
    }
  ]
}

const page = ref(1)
const limit = ref(10)
const total = ref(100)

const handleSelectionChange = val => {
  console.log("选中项:", val)
}

const onPagination = ({ page, limit }) => {
  console.log(`分页: 第${page}页, 每页${limit}条`)
}
</script>
```

## API

### Attributes

| 参数                  | 说明                        | 类型    | 默认值  |
| --------------------- | --------------------------- | ------- | ------- |
| table-data            | 表格数据                    | Array   | []      |
| columns               | 列配置                      | Array   | []      |
| operates              | 操作列配置                  | Object  | —       |
| total                 | 总条数                      | Number  | 0       |
| page / v-model:page   | 当前页码                    | Number  | 1       |
| limit / v-model:limit | 每页条数                    | Number  | 20      |
| options               | Element Plus Table 的配置项 | Object  | {}      |
| pagination-position   | 分页位置                    | String  | 'right' |
| hidden                | 是否隐藏分页                | Boolean | false   |

### Column 配置

| 参数      | 说明                     | 类型             | 默认值 |
| --------- | ------------------------ | ---------------- | ------ |
| prop      | 字段名                   | String           | —      |
| label     | 列标题                   | String           | —      |
| width     | 列宽度                   | Number/String    | —      |
| type      | 列类型 (selection/index) | String           | —      |
| render    | 渲染函数                 | Function         | —      |
| formatter | 格式化函数               | Function         | —      |
| key       | 插槽标识                 | String           | —      |
| show      | 是否显示                 | Boolean/Function | true   |

### Operates 配置

| 参数  | 说明       | 类型          | 默认值  |
| ----- | ---------- | ------------- | ------- |
| width | 操作列宽度 | Number/String | —       |
| fixed | 是否固定   | String        | 'right' |
| list  | 按钮列表   | Array         | []      |

### Button 配置

| 参数    | 说明                 | 类型             | 默认值    |
| ------- | -------------------- | ---------------- | --------- |
| label   | 按钮文字             | String           | —         |
| type    | 按钮类型             | String           | 'primary' |
| icon    | 图标组件             | Component        | —         |
| method  | 点击回调             | Function         | —         |
| show    | 是否显示             | Boolean/Function | true      |
| confirm | 是否在更多按钮中显示 | Boolean          | false     |

### Events

| 事件名                | 说明       | 回调参数                |
| --------------------- | ---------- | ----------------------- |
| pagination            | 分页变化   | { page, limit }         |
| handleSelectionChange | 选择项变化 | selection               |
| sortChange            | 排序变化   | { column, prop, order } |

### Slots

| 插槽名        | 说明       | 参数                    |
| ------------- | ---------- | ----------------------- |
| header-[key]  | 自定义表头 | { column }              |
| default-[key] | 自定义内容 | { row, column, $index } |

## 特性说明

1. **自动分页**: 内置分页组件,支持双向绑定
2. **灵活渲染**: 支持渲染函数、formatter、插槽多种方式
3. **操作列**: 简化操作列配置,支持条件显示和更多按钮
4. **完全兼容**: 保留 Element Plus Table 的所有功能
