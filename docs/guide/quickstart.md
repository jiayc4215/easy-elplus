# 快速开始

本节将介绍如何在项目中使用 Easy ElPlus。

## 前置要求

- Node.js 16.x 或更高版本
- Vue 3.x
- Element Plus 2.x

## 完整引入

如果你对打包体积不是很在意，可以完整引入所有组件。

```javascript
// main.js
import { createApp } from "vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import EasyElPlus from "easy-elplus"
import App from "./App.vue"

const app = createApp(App)

app.use(ElementPlus)
app.use(EasyElPlus)
app.mount("#app")
```

## 按需引入

Easy ElPlus 支持按需引入，可以减小打包体积。

### 手动引入

```javascript
// main.js
import { createApp } from "vue"
import { EasyButton, EasyDialog } from "easy-elplus"
import App from "./App.vue"

const app = createApp(App)

app.component("EasyButton", EasyButton)
app.component("EasyDialog", EasyDialog)
app.mount("#app")
```

### 在组件中使用

```vue
<template>
  <div>
    <easy-button type="primary" :loading="loading"> 提交 </easy-button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyButton } from "easy-elplus"

const loading = ref(false)
</script>
```

## 全局配置

你可以在引入 Easy ElPlus 时进行全局配置：

```javascript
import { createApp } from "vue"
import EasyElPlus from "easy-elplus"

const app = createApp(App)

app.use(EasyElPlus, {
  // 全局配置选项
  size: "default",
  zIndex: 3000
})
```

## 开始使用

现在你可以开始使用 Easy ElPlus 了！查看各个组件的文档了解更多用法：

- [Button 按钮](/components/button)
- [Dialog 对话框](/components/dialog)
- [Table 表格](/components/table)
- [Descriptions 描述列表](/components/descriptions)
- [ImageUpload 图片上传](/components/image-upload)
- [FileUpload 文件上传](/components/file-upload)
