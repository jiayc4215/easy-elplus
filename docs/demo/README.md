# Demo 组件使用说明

本目录包含了用于文档演示的 Vue 组件，这些组件使用 `@vitepress-demo-preview` 插件在文档中展示可交互的示例。

## 已创建的 Demo 组件

### 1. button-basic.vue

Button 组件的基础示例，包含：

- 基础按钮（不同类型）
- 自动加载状态演示
- 不同尺寸
- 禁用状态

### 2. dialog-basic.vue

Dialog 组件的基础示例，包含：

- 纯文本弹窗
- HTML 内容渲染
- 表单弹窗
- 异步操作
- 自定义页脚
- 关闭前拦截

### 3. table-basic.vue

Table 组件的基础示例，包含：

- 多选和序号列
- 自定义渲染（render 函数）
- Formatter 格式化
- 插槽自定义
- 操作列配置
- 分页功能

### 4. descriptions-basic.vue

Descriptions 组件的基础示例，包含：

- 基础用法
- 分组模式
- 条件显示
- 表单编辑
- 数据提交

## 在文档中使用

在 Markdown 文件中使用以下语法引入 demo：

```markdown
<preview path="../demo/button-basic.vue" title="Button 基础示例" description="展示 Button 组件的各种用法"></preview>
```

### 参数说明

- `path`: demo 组件的相对路径
- `title`: demo 的标题
- `description`: demo 的描述

## 创建新的 Demo

1. 在 `docs/demo` 目录下创建新的 `.vue` 文件
2. 编写组件代码（确保导入了所需的组件）
3. 在对应的文档中使用 `<preview>` 标签引入

### Demo 组件模板

```vue
<template>
  <div class="demo-container">
    <!-- 你的示例代码 -->
  </div>
</template>

<script setup>
import { ref } from "vue"
// 导入需要的组件
import { EasyButton } from "easy-elplus"
import { ElMessage } from "element-plus"

// 组件逻辑
</script>

<style scoped>
.demo-container {
  padding: 20px;
}
</style>
```

## 注意事项

1. **组件导入**: 确保正确导入 `easy-elplus` 和 `element-plus` 组件
2. **样式隔离**: 使用 `scoped` 样式避免样式污染
3. **响应式**: 考虑不同屏幕尺寸的展示效果
4. **交互性**: 添加适当的交互反馈，提升用户体验
5. **代码质量**: 保持代码简洁、易读，作为最佳实践示例

## 相关配置

### VitePress 配置 (`.vitepress/config.mjs`)

```javascript
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin"

export default defineConfig({
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  }
})
```

### 主题配置 (`theme/index.js`)

```javascript
import { ElementPlusContainer } from "@vitepress-demo-preview/component"
import "@vitepress-demo-preview/component/dist/style.css"

export default {
  enhanceApp: async ({ app }) => {
    app.component("demo-preview", ElementPlusContainer)
  }
}
```

## 功能特性

- ✅ **代码高亮**: 自动高亮显示源代码
- ✅ **实时预览**: 可交互的组件预览
- ✅ **代码复制**: 一键复制示例代码
- ✅ **展开/收起**: 可展开查看完整代码
- ✅ **响应式**: 适配不同设备尺寸

## 参考资源

- [VitePress Demo Preview 文档](https://github.com/flingyp/vitepress-demo-preview)
- [VitePress 官方文档](https://vitepress.dev/)
- [Element Plus 文档](https://element-plus.org/)
