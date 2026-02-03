---
title: Dialog 对话框
description: 命令式调用的对话框组件，支持组件载入、异步操作等
---

# Dialog 对话框

EasyDialog 是一个基于 Element Plus 的命令式对话框工具，支持函数式调用、组件载入、状态继承、异步操作等特性。

## 在线演示

<preview path="../demo/dialog-basic.vue" title="Dialog 基础示例" description="展示 Dialog 组件的各种用法"></preview>

::: details 表单弹窗组件
<<< ../demo/DialogFormContent.vue
:::

## API

### 函数签名

```javascript
EasyDialog(
  component: Component, // 组件
  componentProps?: object, // 组件属性
  modalProps?: DialogOptions, // 对话框属性
  context?: object //  应用上下文
): Promise<any>
```

### DialogOptions

| 参数              | 说明                   | 类型                                   | 默认值   |
| ----------------- | ---------------------- | -------------------------------------- | -------- |
| title             | 对话框标题             | string                                 | '提示'   |
| confirmButtonText | 确认按钮文字           | string                                 | '确 认'  |
| cancelButtonText  | 取消按钮文字           | string                                 | '取 消'  |
| showConfirmButton | 是否显示确认按钮       | boolean                                | true     |
| showCancelButton  | 是否显示取消按钮       | boolean                                | true     |
| methodKey         | 确认时调用组件的方法名 | string                                 | 'submit' |
| beforeClose       | 关闭前回调             | (done) => void                         | —        |
| onConfirm         | 确认回调               | (instance) => void \| Promise\<void\>  | —        |
| onCancel          | 取消回调               | () => void                             | —        |
| footer            | 自定义页脚渲染函数     | ({ close, confirm, loading }) => VNode | —        |
| draggable         | 是否可拖拽             | boolean                                | true     |
| ...dialogProps    | 其他原生 Dialog 属性   | —                                      | —        |

### 返回值

返回一个 Promise：

- **resolve**: 用户点击确认按钮
- **reject**: 用户点击取消按钮或关闭对话框

## 特性说明

1. **简单提示**: 使用字符串内容
2. **复杂内容**: 使用组件载入
3. **数据交互**: 通过 props 传递数据，通过 defineExpose 暴露方法
4. **异步操作**: 在 onConfirm 或组件方法中使用 async/await
5. **流程控制**: 利用 Promise 实现连续弹窗或条件弹窗
