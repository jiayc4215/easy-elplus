import { h, ref, createApp, markRaw } from "vue"
import { ElDialog, ElButton } from "element-plus"
import { isString, isFunction, getGlobalAppContext } from "@easy-elplus/utils"

/**
 *
 * @param {*} component 组件
 * @param {*} componentProps 组件属性
 * @param {*} modalProps 对话框属性
 * @param {*} context 上下文
 * @returns Promise
 */
export const useDialog = (component, componentProps = {}, modalProps = {}, context = null) => {
  // 如果 component 是字符串，转换为渲染函数
  const contentComponent = isString(component) ? { render: () => h("div", component) } : markRaw(component)

  const {
    title = "提示",
    confirmButtonText = "确 认",
    cancelButtonText = "取 消",
    showConfirmButton = true,
    showCancelButton = true,
    methodKey = "submit",
    beforeClose,
    onConfirm,
    onCancel,
    footer,
    draggable = true,
    ...dialogProps
  } = modalProps

  const visible = ref(true)
  const loading = ref(false)
  const componentRef = ref(null)

  const appContext = context || getGlobalAppContext()

  const div = document.createElement("div")
  document.body.appendChild(div)

  return new Promise((resolve, reject) => {
    let app = null
    let isSettled = false // 标记 Promise 是否已完成，防止重复触发

    // 销毁
    const destroy = () => {
      if (app) {
        app.unmount()
        app = null
      }
      if (div.parentNode) {
        div.parentNode.removeChild(div)
      }
    }

    // 关闭
    const close = () => {
      visible.value = false
    }

    // 统一处理 Promise 结束逻辑
    const handleAction = async (action, data) => {
      if (isSettled) return
      isSettled = true
      if (action === "resolve") resolve(data)
      else reject(data)
      close()
    }

    // 确认
    const handleConfirm = async () => {
      loading.value = true
      try {
        const target = componentRef.value
        // 调用组件方法
        if (target && methodKey && isFunction(target[methodKey])) {
          await target[methodKey]()
        }
        // 调用 onConfirm
        if (isFunction(onConfirm)) {
          await onConfirm(target)
        }
        // 返回 resolve
        await handleAction("resolve", target)
      } catch (e) {
        isSettled = false // 失败时不沉淀状态，允许用户修正后重试
        reject(e)
      } finally {
        loading.value = false
      }
    }

    // 取消
    const handleCancel = () => {
      if (isFunction(onCancel)) onCancel()
      handleAction("reject", "closed")
    }

    // DialogApp
    const DialogApp = {
      setup() {
        return () =>
          h(
            ElDialog,
            {
              ...dialogProps,
              modelValue: visible.value,
              "onUpdate:modelValue": val => {
                visible.value = val
                if (!val && !isSettled) handleAction("reject", "closed")
              },
              title,
              draggable,
              destroyOnClose: true,
              onClosed: destroy, // 动画结束后彻底回收
              // 拦截右上角 X 和遮罩层点击
              beforeClose: done => {
                if (beforeClose) {
                  beforeClose(() => {
                    if (!isSettled) handleAction("reject", "closed")
                    done()
                  })
                } else {
                  if (!isSettled) handleAction("reject", "closed")
                  done()
                }
              }
            },
            {
              // 默认内容 渲染组件
              default: () => h(contentComponent, { ...componentProps, ref: componentRef }),

              // 底部内容
              footer: () => {
                // 自定义 footer
                if (footer) {
                  return isFunction(footer)
                    ? footer({ close: handleCancel, confirm: handleConfirm, loading: loading.value })
                    : footer
                }
                return h("div", { class: "dialog-footer" }, [
                  // 取消按钮
                  showCancelButton && h(ElButton, { onClick: handleCancel }, () => cancelButtonText),
                  // 确认按钮
                  showConfirmButton &&
                    h(
                      ElButton,
                      {
                        type: "primary",
                        loading: loading.value,
                        onClick: handleConfirm
                      },
                      () => confirmButtonText
                    )
                ])
              }
            }
          )
      }
    }

    app = createApp(DialogApp)

    // 优化：上下文继承
    if (appContext) {
      // 核心插件继承 (避免直接操作 _context 私有属性的风险)
      // 如果你的 getGlobalAppContext 已经拿到了真实的 context，可以这样同步
      Object.assign(app._context, {
        ...appContext,
        reload: app._context.reload // 保留新应用的 reload 方法
      })

      // 必须手动同步 provides 以确保 inject 可用
      app._context.provides = { ...(appContext.provides || {}), ...app._context.provides }
    }

    app.mount(div)
  })
}
