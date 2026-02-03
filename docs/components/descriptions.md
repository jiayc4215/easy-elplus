---
title: Descriptions 描述列表
description: 增强的描述列表组件,支持分组、动态渲染等
---

# Descriptions 描述列表

EasyDescriptions 是基于 Element Plus Descriptions 组件封装的增强版本,支持分组、动态组件、条件渲染等功能。

## 在线演示

<preview path="../demo/descriptions-basic.vue" title="Descriptions 基础示例" description="展示 Descriptions 组件的各种用法"></preview>

## API

### Attributes

| 参数                 | 说明           | 类型   | 默认值 |
| -------------------- | -------------- | ------ | ------ |
| items                | 描述列表配置   | Array  | []     |
| modelValue / v-model | 绑定的数据对象 | Object | {}     |

继承 Element Plus Descriptions 的所有属性,如:

| 参数      | 说明           | 类型    | 默认值     |
| --------- | -------------- | ------- | ---------- |
| column    | 一行显示的列数 | Number  | 3          |
| border    | 是否带有边框   | Boolean | false      |
| direction | 排列方向       | String  | horizontal |
| size      | 尺寸           | String  | default    |

### Items 配置

#### 单组模式

```javascript
interface Item {
  label: string | object // 标签文本或配置对象
  value: string | object // 字段名或配置对象
  hidden?: boolean | ((data) => boolean) // 是否隐藏
  span?: number // 占据的列数
  // ... 其他 Descriptions 属性
}
```

#### 分组模式

```javascript
interface GroupItem {
  title?: string // 分组标题
  extra?: string // 操作区文本
  items: Item[] // 该组的字段列表
  hidden?: boolean | ((data) => boolean) // 是否隐藏整个分组
  column?: number // 该组的列数
  border?: boolean // 该组是否带边框
  // ... 其他 DescriptionsItem 属性
}
```

#### Value 对象配置

```javascript
interface ValueConfig {
  id: string // 字段名
  components: string | Component // 组件名或组件
  props: Object // 组件属性
}
```

### Events

继承 Element Plus Descriptions 的所有事件。

### Slots

| 插槽名 | 说明           | 参数         |
| ------ | -------------- | ------------ |
| title  | 自定义标题     |              |
| extra  | 自定义操作区   |              |
| [id]   | 自定义字段内容 | label｜value |

## 特性说明

1. **简单展示**: 直接使用字符串配置
2. **表单编辑**: 使用组件配置实现可编辑的描述列表
3. **分组展示**: 使用分组模式组织复杂数据
4. **条件显示**: 使用 hidden 函数实现动态显示逻辑
5. **自定义渲染**: 使用插槽实现复杂的自定义需求
