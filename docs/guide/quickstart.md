# 快速开始

本节将介绍如何在项目中使用 easy-elplus。

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

easy-elplus 支持按需引入，可以减小打包体积。

### 手动引入

```javascript
// main.js
import { createApp } from "vue"
import { EasyButton, EasyTable } from "easy-elplus"
import App from "./App.vue"

const app = createApp(App)

app.component("EasyButton", EasyButton)
app.component("EasyTable", EasyTable)
app.mount("#app")
```

### 自动导入 (推荐)

如果你在项目中使用 `unplugin-vue-components` 插件，可以根据以下代码配置解析器，实现组件的自动按需引入。

首先，在你的项目中定义解析器：

```javascript
// easy-elplus-resolver.js
export function EasyElPlusResolver() {
  return {
    type: "component",
    resolve: name => {
      // 匹配 Easy 开头或 easy- 开头的组件
      if (name.match(/^(Easy[A-Z]|easy-[a-z])/)) {
        return {
          name,
          from: "easy-elplus"
        }
      }
    }
  }
}
```

然后，在 `vite.config.ts` 或 `webpack.config.js` 中配置插件：

```typescript
// vite.config.ts
import { defineConfig } from "vite"
import Components from "unplugin-vue-components/vite"
import { EasyElPlusResolver } from "./easy-elplus-resolver" // 导入你定义的解析器

export default defineConfig({
  plugins: [
    // ...
    Components({
      resolvers: [EasyElPlusResolver()]
    })
  ]
})
```

现在，你可以在模板中直接使用组件，无需手动引入：

```vue
<template>
  <easy-button type="primary"> 提交 </easy-button>
</template>
```

### 在组件中手动引用

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

## 开始使用

现在你可以开始使用 easy-elplus 了！查看各个组件的文档了解更多用法：

- [Button 按钮](/components/button)
- [Dialog 对话框](/components/dialog)
- [Table 表格](/components/table)
- [Descriptions 描述列表](/components/descriptions)
- [ImageUpload 图片上传](/components/image-upload)
- [FileUpload 文件上传](/components/file-upload)
