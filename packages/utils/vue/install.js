import { NOOP } from "../type"
/**
 * 给组件添加 install 方法，支持主组件 + 附加组件
 * @param {Object} main 主组件
 * @param {Object} [extra] 附加组件集合
 */
export const withInstall = (main, extra) => {
  main.install = app => {
    const components = [main, ...(extra ? Object.values(extra) : [])]

    for (const comp of components) {
      if (comp.name) {
        app.component(comp.name, comp)
      } else {
        console.warn("Component missing name:", comp)
      }
    }
  }

  if (extra) {
    for (const key in extra) {
      main[key] = extra[key]
    }
  }

  return main
}

/**
 * 给组件添加一个空的 install（用于函数组件 / 指令等）
 * @param {Object} component
 */
export const withNoopInstall = component => {
  component.install = NOOP
  return component
}
