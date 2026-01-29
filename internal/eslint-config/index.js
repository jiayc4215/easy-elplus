import js from "@eslint/js" //js规范（标准的）
import globals from "globals" //环境
import pluginVue from "eslint-plugin-vue" //vue规范
import pluginCypress from "eslint-plugin-cypress"
import eslintConfigPrettier from "eslint-config-prettier" // prettier
const ignores = ["node_modules", "dist", "pnpm-lock.yaml", "docs/.vitepress/cache/*", "docs/.vitepress/dist/*", "!.*"]
export default [
  // 1. 全局忽略
  {
    ignores
  },
  // 2. 继承各个插件的推荐配置 (它们是独立的配置对象)
  js.configs.recommended, // JS 推荐规范
  ...pluginVue.configs["flat/essential"], // Vue 规范
  pluginCypress.configs.recommended, // Cypress 规范

  // 3. 自定义全局设置
  {
    files: ["**/*.{js,mjs,cjs,vue}"], // 匹配文件
    // 全局变量 window
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      "vue/multi-word-component-names": "off", // 允许单字组件
      "vue/prefer-import-from-vue": "off" // 允许直接引入
    }
  },

  // 4. Prettier 必须放在最后以覆盖冲突规则
  eslintConfigPrettier
]
