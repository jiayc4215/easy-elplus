---
title: FileUpload 文件上传
description: 文件上传组件,支持多种文件类型和自动解析响应
---

# FileUpload 文件上传

EasyFileUpload 是一个基于 Element Plus Upload 组件封装的文件上传组件。它简化了上传逻辑，支持文件类型和大小校验，并能自动从后端响应中提取文件链接。

## 在线演示

<preview path="../demo/file-upload-basic.vue" title="FileUpload 基础示例" description="展示文件上传的基本功能，包括类型校验和数量限制"></preview>

## 基础用法

通过 `v-model` 绑定文件地址，支持逗号分隔的字符串。

```vue
<template>
  <easy-file-upload v-model="fileUrl" action="/api/upload" />
</template>

<script setup>
import { ref } from "vue"
import { EasyFileUpload } from "easy-elplus"

const fileUrl = ref("")
</script>
```

## 限制文件类型和大小

可以通过 `file-type` 限制允许的文件扩展名，`file-size` 限制单个文件大小（MB）。

```vue
<template>
  <easy-file-upload v-model="fileUrl" action="/api/upload" :file-type="['pdf', 'doc', 'docx']" :file-size="10" />
</template>
```

## 自定义响应解析

如果后端返回的数据结构比较复杂，可以使用 `response-path` 指定文件链接所在的路径。

```vue
<template>
  <easy-file-upload v-model="fileUrl" action="/api/upload" response-path="data.url" error-field="message" />
</template>
```

## API

### Attributes

| 参数          | 说明                                                                           | 类型                      | 默认值                                              |
| ------------- | ------------------------------------------------------------------------------ | ------------------------- | --------------------------------------------------- |
| v-model       | 绑定值，支持逗号分隔的字符串、对象或数组                                       | `String / Object / Array` | —                                                   |
| action        | 上传地址（必传）                                                               | `String`                  | —                                                   |
| limit         | 最大上传数量                                                                   | `Number`                  | 5                                                   |
| file-size     | 文件大小限制 (MB)                                                              | `Number`                  | 5                                                   |
| file-type     | 允许的文件类型后缀                                                             | `Array`                   | `["doc", "xls", "ppt", "txt", "pdf"]`               |
| is-show-tip   | 是否显示上传提示信息                                                           | `Boolean`                 | true                                                |
| headers       | 设置上传的请求头部                                                             | `Object`                  | `{}`                                                |
| base-url      | 基础路径。上传成功后保存时会尝试去除该前缀；回显时如果不是绝对路径会拼接该前缀 | `String`                  | ""                                                  |
| check-success | 自定义成功校验函数，接受响应对象作为参数                                       | `Function`                | `res => res.code === 200 \|\| res.success === true` |
| response-path | 响应中文件地址所在的路径，支持深层嵌套（如 `data.url`）                        | `String`                  | "data"                                              |
| error-field   | 响应中错误消息所在的路径                                                       | `String`                  | "msg"                                               |

### Events

| 事件名            | 说明             | 回调参数          |
| ----------------- | ---------------- | ----------------- |
| update:modelValue | 绑定值变化时触发 | `(value: string)` |

## 特性说明

1. **自动提取 URL**: 无需手动处理 `on-success`，只需通过 `response-path` 配置即可。
2. **多文件支持**: 内置多文件上传支持，通过 `limit` 控制数量。
3. **格式校验**: 自动根据 `file-type` 进行后缀名匹配。
4. **路径处理**: 通过 `base-url` 方便地处理图片服务器前缀。
