import DefaultTheme from "vitepress/theme"
import { ElementPlusContainer } from "@vitepress-demo-preview/component"
import "@vitepress-demo-preview/component/dist/style.css"

import "element-plus/dist/index.css"

export default {
  extends: DefaultTheme, // 继承默认主题
  enhanceApp: async ({ app }) => {
    // 注册图标

    // 注册 demo-preview 组件
    app.component("demo-preview", ElementPlusContainer)
  }
}
