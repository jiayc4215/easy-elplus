---
title: Button 按钮
description: 增强的按钮组件，自动处理异步操作的加载状态
---

# Button 按钮

EasyButton 是基于 Element Plus 的 Button 组件封装的增强版本，主要特性是自动处理异步操作的加载状态。

## 在线演示

EasyButton 的核心特性是自动处理异步操作。当点击事件返回 Promise 时，按钮会自动显示加载状态，直到 Promise 完成。

<preview path="../demo/button-basic.vue" title="Button 基础示例" description="展示 Button 组件的各种用法"></preview>

## API

### Attributes

EasyButton 继承了 Element Plus Button 的所有属性，常用属性如下：

| 属性名   | 说明                       | 类型      | 可选值                                             | 默认值 |
| -------- | -------------------------- | --------- | -------------------------------------------------- | ------ |
| type     | 类型                       | string    | primary / success / warning / danger / info / text | —      |
| size     | 尺寸                       | string    | large / default / small                            | —      |
| plain    | 是否朴素按钮               | boolean   | —                                                  | false  |
| round    | 是否圆角按钮               | boolean   | —                                                  | false  |
| circle   | 是否圆形按钮               | boolean   | —                                                  | false  |
| loading  | 是否加载中状态（手动控制） | boolean   | —                                                  | false  |
| disabled | 是否禁用状态               | boolean   | —                                                  | false  |
| icon     | 图标组件                   | Component | —                                                  | —      |

### Events

| 事件名 | 说明                   | 回调参数                                       |
| ------ | ---------------------- | ---------------------------------------------- |
| click  | 点击事件，支持异步函数 | (event: MouseEvent) => void \| Promise\<void\> |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## 特性说明

EasyButton 会自动检测 `click` 事件处理函数是否返回 Promise。如果返回 Promise，按钮会：

1. 立即进入加载状态（显示 loading 图标）
2. 等待 Promise 完成
3. 自动恢复正常状态

这样可以避免重复点击导致的重复提交问题。
