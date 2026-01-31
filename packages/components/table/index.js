// 用来整合组件的，最终实现导出组件

import { withInstall } from "@easy-elplus/utils"
import table from "./src/table.vue"

// 通过 withInstall 方法给 button 添加了一个 Vue3 插件所需的 install 方法
export const EasyTable = withInstall(table)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用

export default EasyTable
export * from "./src/table.vue"
