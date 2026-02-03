# Easy ElPlus

## 技术交流群 711368818

<img src="./public/qq.jpg"  width="200" />

## Introduction

### WHAT

`easy-elplus` 是基于 [Element Plus](https://element-plus.org/) 的二次封装组件库。它在完全保留 Element Plus 组件能力的基础上，对常用组件进行了功能增强和 API 简化。通过内置的通用逻辑处理，开发者可以用更少的代码实现更丰富的功能。

### WHY

在我们的日常开发中，大量的时间被消耗在重复的交互逻辑上，例如：

- 每一个异步操作按钮都需要手动维护 `loading` 状态。
- 表格页面包含了大量重复的分页、列配置和查询逻辑。
- 对话框的打开/关闭、表单重置需要编写繁琐的模版代码。

`easy-elplus` 旨在解决这些痛点。它通过封装最佳实践，让组件"更聪明"，从而减少重复代码，提升开发效率，同时保持了与 Element Plus 的高度兼容性。

## Features

- **EasyButton**: 智能按钮，自动检测异步 Click 事件并管理 loading 状态。
- **EasyTable**: 配置化表格，支持多级表头、自动分页、自定义列渲染。
- **EasyDialog**: 简化的对话框，支持通过 v-model 控制显隐，内置全屏功能。
- **Uploaders**: 封装完善的 [ImageUpload] 和 [FileUpload] 组件，简化文件上传流程。
- **Descriptions**: 增强的描述列表，支持配置化渲染。

## Quick Start

```bash
pnpm i easy-elplus
```

```ts
import { createApp } from "vue"
import EasyElPlus from "easy-elplus"

const app = createApp(App)
app.use(EasyElPlus)
```

### Basic Usage

#### EasyButton

```vue
<template>
  <EasyButton type="primary" @click="handleAsync"> 点击自动 Loading </EasyButton>
</template>

<script setup>
const handleAsync = async () => {
  // 按钮会自动显示 loading 直到 promise resolve
  await new Promise(r => setTimeout(r, 2000))
}
</script>
```

## Links

- [组件文档](https://jiayc4215.github.io/easy-elplus/)
- [vue3表单渲染器](https://jiayc4215.github.io/form-render/)

## Inspiration

Thanks to [Element Plus](https://element-plus.org/)
