---
title: ImageUpload 图片上传
description: 图片上传组件,支持预览、删除等功能
---

# ImageUpload 图片上传

EasyImageUpload 是一个基于 Element Plus Upload 组件封装的图片上传组件，专门针对图片上传场景进行了优化。

## 在线演示

<preview path="../demo/image-upload-basic.vue" title="ImageUpload 基础示例" description="展示图片上传的基本功能，包括预览和自动解析"></preview>

## API

### Attributes

| 参数          | 说明                                                                           | 类型                      | 默认值                                              |
| ------------- | ------------------------------------------------------------------------------ | ------------------------- | --------------------------------------------------- |
| v-model       | 绑定值，支持逗号分隔的字符串、对象或数组                                       | `String / Object / Array` | —                                                   |
| action        | 上传地址（必传）                                                               | `String`                  | —                                                   |
| limit         | 最大上传数量                                                                   | `Number`                  | 5                                                   |
| file-size     | 图片大小限制 (MB)                                                              | `Number`                  | 5                                                   |
| file-type     | 允许的图片类型后缀                                                             | `Array`                   | `["png", "jpg", "jpeg"]`                            |
| is-show-tip   | 是否显示上传提示信息                                                           | `Boolean`                 | true                                                |
| headers       | 设置上传的请求头部                                                             | `Object`                  | `{}`                                                |
| base-url      | 基础路径。上传成功后保存时会尝试去除该前缀；回显时如果不是绝对路径会拼接该前缀 | `String`                  | ""                                                  |
| check-success | 自定义成功校验函数，接受响应对象作为参数                                       | `Function`                | `res => res.code === 200 \|\| res.success === true` |
| response-path | 响应中图片地址所在的路径，支持深层嵌套（如 `data.url`）                        | `String`                  | "data"                                              |
| error-field   | 响应中错误消息所在的路径                                                       | `String`                  | "msg"                                               |

### Events

| 事件名            | 说明             | 回调参数          |
| ----------------- | ---------------- | ----------------- |
| update:modelValue | 绑定值变化时触发 | `(value: string)` |

## 特性说明

1. **自动预览**: 点击上传后的图片缩略图，可以查看大图预览。
2. **隐藏上传按钮**: 当上传图片数量达到 `limit` 限制时，会自动隐藏上传按钮。
3. **格式校验**: 默认只允许 `png`, `jpg`, `jpeg` 格式。
4. **路径处理**: 配合 `base-url` 可以灵活处理后端返回的相对路径。
