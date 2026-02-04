---
title: Dialog
description: Imperative dialog component, supporting component loading, async operations, etc.
---

# Dialog

EasyDialog is an imperative dialog tool based on Element Plus, supporting functional calls, component loading, state inheritance, async operations, etc.

## Online Demo

<preview path="../../demo/dialog-basic.vue" title="Dialog Basic Example" description="Show various usages of Dialog component"></preview>

::: details Form Dialog Component
<<< ../../demo/DialogFormContent.vue
:::

## API

### Function Signature

```javascript
EasyDialog(
  component: Component, // component
  componentProps?: object, // component props
  modalProps?: DialogOptions, // dialog props
  context?: object //  app context
): Promise<any>
```

### DialogOptions

| Attribute         | Description                              | Type                                   | Default   |
| ----------------- | ---------------------------------------- | -------------------------------------- | --------- |
| title             | Dialog title                             | string                                 | 'Tip'     |
| confirmButtonText | Confirm button text                      | string                                 | 'Confirm' |
| cancelButtonText  | Cancel button text                       | string                                 | 'Cancel'  |
| showConfirmButton | Whether to show confirm button           | boolean                                | true      |
| showCancelButton  | Whether to show cancel button            | boolean                                | true      |
| methodKey         | Component method name to call on confirm | string                                 | 'submit'  |
| beforeClose       | Callback before closing                  | (done) => void                         | —         |
| onConfirm         | Confirm callback                         | (instance) => void \| Promise\<void\>  | —         |
| onCancel          | Cancel callback                          | () => void                             | —         |
| footer            | Custom footer render function            | ({ close, confirm, loading }) => VNode | —         |
| draggable         | Whether it's draggable                   | boolean                                | true      |
| ...dialogProps    | Other native Dialog props                | —                                      | —         |

### Return Value

Returns a Promise:

- **resolve**: User clicks confirm button
- **reject**: User clicks cancel button or closes the dialog

## Features

1. **Simple Prompt**: Use string content
2. **Complex Content**: Use component loading
3. **Data Interaction**: Pass data via props, expose methods via defineExpose
4. **Async Operations**: Use async/await in onConfirm or component methods
5. **Flow Control**: Use Promise to implement sequential dialogs or conditional dialogs
