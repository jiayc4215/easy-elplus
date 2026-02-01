---
title: Dialog 对话框
description: 命令式调用的对话框组件，支持组件载入、异步操作等
---

# Dialog 对话框

EasyDialog 是一个基于 Element Plus 的命令式对话框工具，支持函数式调用、组件载入、状态继承、异步操作等特性。

## 在线演示

<preview path="../demo/dialog-basic.vue" title="Dialog 基础示例" description="展示 Dialog 组件的各种用法"></preview>

## 基础用法

最简单的用法是传入一个字符串：

```javascript
import { EasyDialog } from "easy-elplus"

EasyDialog("这是一个简单的提示信息")
```

## HTML 内容

使用渲染函数显示 HTML 内容：

```javascript
import { h } from "vue"
import { EasyDialog } from "easy-elplus"

EasyDialog(
  {
    render: () =>
      h("div", [
        h("h3", { style: "color: var(--el-color-primary)" }, "HTML 内容"),
        h("p", "您可以在这里使用 Vue 的渲染函数。")
      ])
  },
  {},
  { title: "渲染函数示例" }
)
```

## 载入组件

EasyDialog 可以载入 Vue 组件：

```vue
<!-- MyForm.vue -->
<template>
  <el-form :model="form">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="地区">
      <el-input v-model="form.region" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from "vue"

const form = ref({
  name: "",
  region: ""
})

// 暴露方法供 EasyDialog 调用
const getFormData = () => form.value

defineExpose({
  getFormData
})
</script>
```

```javascript
import { EasyDialog } from "easy-elplus"
import MyForm from "./MyForm.vue"

EasyDialog(
  MyForm,
  {}, // props
  {
    title: "表单示例",
    onConfirm: instance => {
      const data = instance.getFormData()
      console.log("表单数据：", data)
    }
  }
)
```

## 异步操作

支持异步确认操作，按钮会自动显示加载状态：

```vue
<!-- AsyncDemo.vue -->
<template>
  <div>
    <el-input v-model="userInput" placeholder="请输入内容" />
  </div>
</template>

<script setup>
import { ref } from "vue"

const userInput = ref("")

const submit = async () => {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 2000))
  return userInput.value
}

defineExpose({
  submit,
  userInput
})
</script>
```

```javascript
EasyDialog(
  AsyncDemo,
  {},
  {
    title: "异步提交演示",
    onConfirm: async instance => {
      console.log("收到的数据:", instance.userInput)
    }
  }
)
```

## 传递 Props

可以向组件传递初始数据：

```javascript
EasyDialog(
  MyForm,
  {
    // 传递给组件的 props
    row: {
      name: "Antigravity",
      region: "Shanghai"
    }
  },
  {
    title: "编辑模式",
    onConfirm: inst => {
      const data = inst.getFormData()
      console.log("更新后的数据:", data)
    }
  }
)
```

## 自定义页脚

使用渲染函数自定义页脚：

```javascript
import { h } from "vue"
import { ElButton } from "element-plus"

EasyDialog(
  "自定义页脚示例",
  {},
  {
    title: "自定义页脚",
    footer: ({ close, confirm, loading }) =>
      h("div", { style: "display: flex; justify-content: space-between" }, [
        h("span", "自定义提示"),
        h("div", [
          h(ElButton, { onClick: close }, () => "取消"),
          h(
            ElButton,
            {
              type: "primary",
              loading: loading,
              onClick: confirm
            },
            () => "确认"
          )
        ])
      ])
  }
)
```

## 隐藏页脚

```javascript
EasyDialog(
  "这个弹窗没有页脚按钮",
  {},
  {
    title: "无页脚",
    showConfirmButton: false,
    showCancelButton: false
  }
)
```

## 关闭前拦截

```javascript
import { ElMessageBox } from "element-plus"

EasyDialog(
  "尝试关闭此弹窗会触发确认",
  {},
  {
    title: "关闭前拦截",
    beforeClose: done => {
      ElMessageBox.confirm("确定要关闭吗？")
        .then(() => done())
        .catch(() => {})
    }
  }
)
```

## 连续弹窗

EasyDialog 返回 Promise，可以实现连续弹窗：

```javascript
const openSequential = async () => {
  try {
    await EasyDialog("第一步", {}, { title: "步骤 1" })
    await EasyDialog("第二步", {}, { title: "步骤 2" })
    await EasyDialog("第三步", {}, { title: "步骤 3" })
    ElMessage.success("全部完成")
  } catch {
    ElMessage.info("流程中断")
  }
}
```

## API

### 函数签名

```typescript
EasyDialog(
  content: string | Component | { render: Function },
  props?: object,
  options?: DialogOptions
): Promise<any>
```

### DialogOptions

| 参数              | 说明                   | 类型                                   | 默认值   |
| ----------------- | ---------------------- | -------------------------------------- | -------- |
| title             | 对话框标题             | string                                 | '提示'   |
| width             | 对话框宽度             | string                                 | '50%'    |
| draggable         | 是否可拖拽             | boolean                                | true     |
| showConfirmButton | 是否显示确认按钮       | boolean                                | true     |
| showCancelButton  | 是否显示取消按钮       | boolean                                | true     |
| confirmButtonText | 确认按钮文字           | string                                 | '确定'   |
| cancelButtonText  | 取消按钮文字           | string                                 | '取消'   |
| methodKey         | 确认时调用组件的方法名 | string                                 | 'submit' |
| onConfirm         | 确认回调               | (instance) => void \| Promise\<void\>  | —        |
| beforeClose       | 关闭前回调             | (done) => void                         | —        |
| footer            | 自定义页脚渲染函数     | ({ close, confirm, loading }) => VNode | —        |

### 返回值

返回一个 Promise：

- **resolve**: 用户点击确认按钮
- **reject**: 用户点击取消按钮或关闭对话框

## 特性说明

### 组件实例访问

在 `onConfirm` 回调中，可以访问组件实例：

```javascript
onConfirm: instance => {
  // instance 是组件通过 defineExpose 暴露的对象
  const data = instance.getFormData()
}
```

### 自动加载状态

如果 `onConfirm` 或组件的 `methodKey` 方法返回 Promise，确认按钮会自动显示加载状态。

### 拖拽功能

默认开启拖拽功能，可以通过标题栏拖动对话框位置。设置 `draggable: false` 可禁用。

## 最佳实践

1. **简单提示**: 使用字符串内容
2. **复杂内容**: 使用组件载入
3. **数据交互**: 通过 props 传递数据，通过 defineExpose 暴露方法
4. **异步操作**: 在 onConfirm 或组件方法中使用 async/await
5. **流程控制**: 利用 Promise 实现连续弹窗或条件弹窗
