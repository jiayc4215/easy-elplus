---
title: Button 按钮
description: 增强的按钮组件，自动处理异步操作的加载状态
---

# Button 按钮

EasyButton 是基于 Element Plus 的 Button 组件封装的增强版本，主要特性是自动处理异步操作的加载状态。

## 在线演示

<preview path="../demo/button-basic.vue" title="Button 基础示例" description="展示 Button 组件的各种用法"></preview>

## 基础用法

基本的按钮用法与 Element Plus 的 Button 组件相同。

```vue
<template>
  <div>
    <easy-button>默认按钮</easy-button>
    <easy-button type="primary">主要按钮</easy-button>
    <easy-button type="success">成功按钮</easy-button>
    <easy-button type="info">信息按钮</easy-button>
    <easy-button type="warning">警告按钮</easy-button>
    <easy-button type="danger">危险按钮</easy-button>
  </div>
</template>

<script setup>
import { EasyButton } from "easy-elplus"
</script>
```

## 自动加载状态

EasyButton 的核心特性是自动处理异步操作。当点击事件返回 Promise 时，按钮会自动显示加载状态，直到 Promise 完成。

```vue
<template>
  <div>
    <easy-button type="primary" @click="handleAsyncClick"> 异步提交 </easy-button>
  </div>
</template>

<script setup>
import { EasyButton } from "easy-elplus"
import { ElMessage } from "element-plus"

const handleAsyncClick = async () => {
  // 模拟异步操作（如 API 调用）
  await new Promise(resolve => setTimeout(resolve, 2000))
  ElMessage.success("操作成功")
}
</script>
```

在上面的例子中，点击按钮后会自动显示加载状态，2秒后自动恢复。你不需要手动管理 `loading` 状态。

## 完整示例

```vue
<template>
  <div class="demo-container">
    <h3>基础按钮</h3>
    <div class="button-group">
      <easy-button @click="onClick">Default</easy-button>
      <easy-button type="primary" @click="onClick">Primary</easy-button>
      <easy-button type="success" @click="onClick">Success</easy-button>
      <easy-button type="info" @click="onClick">Info</easy-button>
      <easy-button type="warning" @click="onClick">Warning</easy-button>
      <easy-button type="danger" @click="onClick">Danger</easy-button>
    </div>

    <h3>不同尺寸</h3>
    <div class="button-group">
      <easy-button size="large" @click="onClick">Large</easy-button>
      <easy-button @click="onClick">Default</easy-button>
      <easy-button size="small" @click="onClick">Small</easy-button>
    </div>

    <h3>禁用状态</h3>
    <div class="button-group">
      <easy-button disabled>Disabled</easy-button>
      <easy-button type="primary" disabled>Primary Disabled</easy-button>
    </div>
  </div>
</template>

<script setup>
import { EasyButton } from "easy-elplus"

const onClick = async () => {
  // 模拟异步操作
  return new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
}
.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
</style>
```

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

| 插槽名  | 说明             |
| ------- | ---------------- |
| default | 按钮内容         |
| loading | 自定义加载中图标 |
| icon    | 自定义图标       |

## 特性说明

### 自动加载状态

EasyButton 会自动检测 `click` 事件处理函数是否返回 Promise。如果返回 Promise，按钮会：

1. 立即进入加载状态（显示 loading 图标）
2. 等待 Promise 完成
3. 自动恢复正常状态

这样可以避免重复点击导致的重复提交问题。

### 与 Element Plus Button 的区别

- **自动加载**: EasyButton 会自动处理异步操作的加载状态
- **防重复点击**: 在加载期间，按钮会自动禁用，防止重复点击
- **完全兼容**: 保留了 Element Plus Button 的所有功能和 API

## 最佳实践

1. **异步操作**: 对于需要调用 API 的操作，使用 EasyButton 可以自动处理加载状态
2. **表单提交**: 在表单提交按钮上使用，避免重复提交
3. **普通按钮**: 对于不需要异步处理的按钮，也可以使用 EasyButton，它会正常工作
