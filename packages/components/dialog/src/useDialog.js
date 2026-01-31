import { h, ref, createApp, markRaw, getCurrentInstance } from "vue"
import { ElDialog, ElButton, ElConfigProvider } from "element-plus"
import { isString, getGlobalAppContext } from "@easy-elplus/utils"

export const useDialog = (component, componentProps = {}, modalProps = {}) => {
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

  const callerInstance = getCurrentInstance()
  const appContext = callerInstance?.appContext || getGlobalAppContext()

  const div = document.createElement("div")
  document.body.appendChild(div)

  return new Promise((resolve, reject) => {
    let app = null
    let isSettled = false // 标记 Promise 是否已完成，防止重复触发

    const destroy = () => {
      if (app) {
        app.unmount()
        app = null
      }
      if (div.parentNode) {
        div.parentNode.removeChild(div)
      }
    }

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

    const handleConfirm = async () => {
      loading.value = true
      try {
        const target = componentRef.value
        if (target && methodKey && typeof target[methodKey] === "function") {
          await target[methodKey]()
        }
        if (typeof onConfirm === "function") {
          await onConfirm(target)
        }
        await handleAction("resolve", target)
      } catch (e) {
        console.warn("[useDialog] 确认操作拦截:", e)
        isSettled = false // 失败时不沉淀状态，允许用户修正后重试
      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      if (typeof onCancel === "function") onCancel()
      handleAction("reject", "cancel")
    }

    const DialogApp = {
      setup() {
        return () =>
          h(
            ElConfigProvider,
            { locale: appContext?.config?.globalProperties?.$ELEMENT?.locale },
            {
              default: () =>
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
                    default: () => h(contentComponent, { ...componentProps, ref: componentRef }),
                    footer: () => {
                      if (footer) {
                        return typeof footer === "function"
                          ? footer({ close: handleCancel, confirm: handleConfirm, loading: loading.value })
                          : footer
                      }
                      return h("div", { class: "dialog-footer" }, [
                        showCancelButton && h(ElButton, { onClick: handleCancel }, () => cancelButtonText),
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
