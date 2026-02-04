---
title: Table
description: Enhanced table component, supports multi-level headers, operation columns, render functions, etc.
---

# Table

EasyTable is an enhanced version based on Element Plus Table component, providing more convenient configuration and rich features.

## Online Demo

<preview path="../../demo/table-basic.vue" title="Table Basic Example" description="Show various usages of Table component"></preview>

## API

### Attributes

| Attribute             | Description                                | Type    | Default                                                       |
| :-------------------- | :----------------------------------------- | :------ | :------------------------------------------------------------ |
| table-data            | Table data                                 | Array   | []                                                            |
| columns               | Columns config                             | Array   | []                                                            |
| operates              | Operation columns config                   | Object  | —                                                             |
| total                 | Total count                                | Number  | 0                                                             |
| page / v-model:page   | Current page                               | Number  | 1                                                             |
| limit / v-model:limit | Page size                                  | Number  | 20                                                            |
| options               | Element Plus Table options                 | Object  | `{ stripe: false, highlightCurrentRow: false, border: true }` |
| pagination-position   | Pagination position                        | String  | 'right'                                                       |
| hidden                | Whether to conceal pagination              | Boolean | false                                                         |
| page-sizes            | Page size options                          | Array   | [10, 20, 30, 50]                                              |
| pager-count           | Max pager buttons                          | Number  | 7                                                             |
| layout                | Pagination layout                          | String  | 'total, sizes, prev, pager, next, jumper'                     |
| background            | Whether to add background to pager buttons | Boolean | true                                                          |
| auto-scroll           | Whether to scroll to top when page changes | Boolean | true                                                          |

---

### Column Configuration

In addition to the parameters listed below, all attributes of [ElTableColumn](https://element-plus.org/en-US/component/table.html#table-column-attributes) are supported.

| Attribute | Description                                    | Type               | Default |
| :-------- | :--------------------------------------------- | :----------------- | :------ |
| prop      | Field name                                     | String             | —       |
| label     | Column label                                   | String             | —       |
| width     | Column width                                   | Number / String    | —       |
| align     | Alignment (left / center / right)              | String             | 'left'  |
| fixed     | Fixed column (left / right)                    | String / Boolean   | —       |
| type      | Column type (selection / index)                | String             | —       |
| render    | Render function (supports VNode / HTML string) | Function / String  | —       |
| formatter | Formatter function (supports HTML string)      | Function           | —       |
| key       | Slot identifier (defaults to prop)             | String             | —       |
| show      | Whether to show                                | Boolean / Function | true    |

---

### Operates (Operation Column Configuration)

| Attribute | Description    | Type            | Default |
| :-------- | :------------- | :-------------- | :------ |
| width     | Column width   | Number / String | —       |
| fixed     | Whether to fix | String          | 'right' |
| list      | Button list    | Array           | []      |

---

### Button Configuration

In addition to the parameters listed below, all attributes of [ElButton](https://element-plus.org/en-US/component/button.html#button-attributes) are supported.

| Attribute | Description     | Type               | Default   |
| :-------- | :-------------- | :----------------- | :-------- |
| label     | Button text     | String             | —         |
| type      | Button type     | String             | 'primary' |
| size      | Button size     | String             | 'small'   |
| icon      | Icon component  | Component          | —         |
| method    | Click callback  | Function           | —         |
| show      | Whether to show | Boolean / Function | true      |

---

### Events

| Event Name            | Description       | Callback Parameters       |
| :-------------------- | :---------------- | :------------------------ |
| pagination            | Pagination change | `{ page, limit }`         |
| handleSelectionChange | Selection change  | `selection`               |
| sortChange            | Sort change       | `{ column, prop, order }` |

---

### Slots

| Slot Name     | Description    | Parameters                |
| :------------ | :------------- | :------------------------ |
| header-[key]  | Custom header  | `{ column }`              |
| default-[key] | Custom content | `{ row, column, $index }` |

---

### Methods

| Method Name | Description          | Parameters |
| :---------- | :------------------- | :--------- |
| iTableRef   | Get ElTable instance | —          |

---

## Features

1. **Auto Pagination**: Built-in pagination component, supports two-way binding.
2. **Flexible Render**: Supports `render`, `formatter`, and slots.
3. **Simplified Operations**: Unified configuration for operation buttons, supports conditional display.
4. **Fully Compatible**: Fully retains Element Plus Table capabilities.
