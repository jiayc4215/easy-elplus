import Button from "@easy-elplus/components/button"
import Descriptions from "@easy-elplus/components/descriptions"
import Table from "@easy-elplus/components/table"

// 组件列表
const components = [Button, Descriptions, Table]

// 是否已安装标识（防止重复 install）
const INSTALLED_KEY = Symbol("INSTALLED_KEY")

// 组件库插件
const EasyElementPlus = {
  install(app) {
    // 防止重复安装
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true

    // 逐个安装组件
    components.forEach(component => {
      app.use(component)
    })
  }
}

export default EasyElementPlus

// 具名导出所有组件，支持按需导入
export * from "@easy-elplus/components"
