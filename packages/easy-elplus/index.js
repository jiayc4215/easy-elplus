import Button from "@easy-elplus/components/button"
import Descriptions from "@easy-elplus/components/descriptions"
import Table from "@easy-elplus/components/table"
import ImageUpload from "@easy-elplus/components/ImageUpload"
import FileUpload from "@easy-elplus/components/FileUpload"
import { setGlobalAppContext } from "@easy-elplus/utils"

// 组件列表
const components = [Button, Descriptions, Table, ImageUpload, FileUpload]

// 是否已安装标识（防止重复 install）
const INSTALLED_KEY = Symbol("INSTALLED_KEY")

// 组件库插件
const EasyElementPlus = {
  install(app) {
    // 防止重复安装
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true

    // 保存全局应用上下文，供 EasyDialog 等工具使用
    // 这样即使在非组件上下文中调用，也能访问到主应用的插件和全局组件
    setGlobalAppContext(app._context)

    // 逐个安装组件
    components.forEach(component => {
      app.use(component)
    })
  }
}

export default EasyElementPlus

// 具名导出所有组件，支持按需导入
export * from "@easy-elplus/components"
