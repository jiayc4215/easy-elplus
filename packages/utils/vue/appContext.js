/**
 * 全局应用上下文管理
 * 用于在非组件上下文中访问主应用的配置、插件和全局组件
 */

let globalAppContext = null

/**
 * 设置全局应用上下文
 * 应该在主应用初始化时调用（通常在 app.use() 中）
 * @param {AppContext} context - Vue 应用上下文
 */
export function setGlobalAppContext(context) {
  globalAppContext = context
}

/**
 * 获取全局应用上下文
 * @returns {AppContext | null}
 */
export function getGlobalAppContext() {
  return globalAppContext
}
