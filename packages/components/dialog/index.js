// Dialog 是一个命令式 API（函数式调用），而非 Vue 组件
// 用法: const dialog = useDialog(component, props, options)
// 或者: import { EasyDialog } from "@easy-elplus"; EasyDialog(...)

import { useDialog } from "./src/useDialog"

// 导出命名函数，保持与其他组件命名一致性
export const EasyDialog = useDialog

// 导出原始函数名，方便理解其用途
export { useDialog }

// 默认导出
export default useDialog
