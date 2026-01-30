import { h, resolveComponent } from "vue"
import { isString, isFunction, isNumber } from "@easy-elplus/utils"

export function useDynamicComponent() {
  /**
   *
   * @param {string | number | Component | Function} type 组件名称
   * @param {Object} scope 作用域
   * @returns {Component}
   */
  const getComponent = (type, scope) => {
    //  非 string / number，说明是组件对象或渲染函数
    if (type && !isString(type) && !isNumber(type)) {
      return isFunction(type) ? type(scope) : type
    }

    const componentKey = type
    let dynamicComponent

    // 只解析 el- 前缀的组件
    if (isString(componentKey) && componentKey.startsWith("el-")) {
      dynamicComponent = resolveComponent(componentKey)
    }

    // 成功解析到组件（resolveComponent 失败会返回字符串）
    if (dynamicComponent && !isString(dynamicComponent)) {
      return dynamicComponent
    }

    // fallback：文本组件
    return {
      name: "DynamicText",
      props: ["modelValue"],
      render() {
        if (!scope) {
          return h("span", {}, componentKey)
        }

        // 否则是 value,判断是否为空(null 或空字符串)
        const isEmpty = this.modelValue === null || this.modelValue === "" || this.modelValue === undefined
        const displayValue = isEmpty ? "--" : this.modelValue
        return h("span", {}, displayValue)
      }
    }
  }

  return {
    getComponent
  }
}
