---
title: Table 表格
description: 增强的表格组件，支持多级表头、操作列、渲染函数等
---

# Table 表格

EasyTable 是基于 Element Plus Table 组件封装的增强版本，提供了更便捷的配置方式和丰富的功能。

## 在线演示

<preview path="../demo/table-basic.vue" title="Table 基础示例" description="展示 Table 组件的各种用法"></preview>

## API

### Attributes

| 参数                  | 说明                        | 类型    | 默认值                                                        |
| :-------------------- | :-------------------------- | :------ | :------------------------------------------------------------ |
| table-data            | 表格数据                    | Array   | []                                                            |
| columns               | 列配置                      | Array   | []                                                            |
| operates              | 操作列配置                  | Object  | —                                                             |
| total                 | 总条数                      | Number  | 0                                                             |
| page / v-model:page   | 当前页码                    | Number  | 1                                                             |
| limit / v-model:limit | 每页条数                    | Number  | 20                                                            |
| options               | Element Plus Table 的配置项 | Object  | `{ stripe: false, highlightCurrentRow: false, border: true }` |
| pagination-position   | 分页位置                    | String  | 'right'                                                       |
| hidden                | 是否隐藏分页                | Boolean | false                                                         |
| page-sizes            | 每页条数选项                | Array   | [10, 20, 30, 50]                                              |
| pager-count           | 最大页码按钮数              | Number  | 7                                                             |
| layout                | 分页布局                    | String  | 'total, sizes, prev, pager, next, jumper'                     |
| background            | 是否为分页按钮添加背景色    | Boolean | true                                                          |
| auto-scroll           | 分页变化时是否自动回顶      | Boolean | true                                                          |

---

### Column 配置

除下表所列参数外，还支持 [ElTableColumn](https://element-plus.org/zh-CN/component/table.html#table-column-attributes) 的所有属性。

| 参数      | 说明                                | 类型               | 默认值 |
| :-------- | :---------------------------------- | :----------------- | :----- |
| prop      | 字段名                              | String             | —      |
| label     | 列标题                              | String             | —      |
| width     | 列宽度                              | Number / String    | —      |
| align     | 对齐方式 (left / center / right)    | String             | 'left' |
| fixed     | 固定列 (left / right)               | String / Boolean   | —      |
| type      | 列类型 (selection / index)          | String             | —      |
| render    | 渲染函数 (支持 VNode / HTML 字符串) | Function / String  | —      |
| formatter | 格式化函数 (支持 HTML 字符串)       | Function           | —      |
| key       | 插槽标识 (默认使用 prop)            | String             | —      |
| show      | 是否显示                            | Boolean / Function | true   |

---

### Operates（操作列配置）

| 参数  | 说明       | 类型            | 默认值  |
| :---- | :--------- | :-------------- | :------ |
| width | 操作列宽度 | Number / String | —       |
| fixed | 是否固定   | String          | 'right' |
| list  | 按钮列表   | Array           | []      |

---

### Button 配置

除下表所列参数外，还支持 [ElButton](https://element-plus.org/zh-CN/component/button.html#button-attributes) 的所有属性。

| 参数   | 说明     | 类型               | 默认值    |
| :----- | :------- | :----------------- | :-------- |
| label  | 按钮文字 | String             | —         |
| type   | 按钮类型 | String             | 'primary' |
| size   | 按钮尺寸 | String             | 'small'   |
| icon   | 图标组件 | Component          | —         |
| method | 点击回调 | Function           | —         |
| show   | 是否显示 | Boolean / Function | true      |

---

### Events

| 事件名                | 说明       | 回调参数                  |
| :-------------------- | :--------- | :------------------------ |
| pagination            | 分页变化   | `{ page, limit }`         |
| handleSelectionChange | 选择项变化 | `selection`               |
| sortChange            | 排序变化   | `{ column, prop, order }` |

---

### Slots

| 插槽名        | 说明       | 参数                      |
| :------------ | :--------- | :------------------------ |
| header-[key]  | 自定义表头 | `{ column }`              |
| default-[key] | 自定义内容 | `{ row, column, $index }` |

---

### Methods

| 方法名    | 说明              | 参数 |
| :-------- | :---------------- | :--- |
| iTableRef | 获取 ElTable 实例 | —    |

---

## 特性说明

1. **自动分页**：内置分页组件，支持双向绑定。
2. **灵活渲染**：支持 `render`、`formatter`、插槽多种方式。
3. **操作列简化**：统一配置操作按钮，支持条件显示。
4. **完全兼容**：完整保留 Element Plus Table 能力。
