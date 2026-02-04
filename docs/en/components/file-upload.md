---
title: FileUpload
description: File upload component, supports multiple file types and automatic response parsing
---

# FileUpload

EasyFileUpload is a file upload component based on Element Plus Upload component. It simplifies the upload logic, checks file types and sizes, and automatically extracts file links from backend responses.

## Online Demo

<preview path="../../demo/file-upload-basic.vue" title="FileUpload Basic Example" description="Show key features of file upload, including type validation and quantity limit"></preview>

## API

### Attributes

| Attribute     | Description                                                                                                                                    | Type                      | Default                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------- |
| v-model       | Binding value, supports comma-separated string, object, or array                                                                               | `String / Object / Array` | —                                                   |
| action        | Upload URL (Required)                                                                                                                          | `String`                  | —                                                   |
| limit         | Max upload count                                                                                                                               | `Number`                  | 5                                                   |
| file-size     | File size limit (MB)                                                                                                                           | `Number`                  | 5                                                   |
| file-type     | Allowed file extensions                                                                                                                        | `Array`                   | `["doc", "xls", "ppt", "txt", "pdf"]`               |
| is-show-tip   | Whether to show upload tip                                                                                                                     | `Boolean`                 | true                                                |
| headers       | Request headers for upload                                                                                                                     | `Object`                  | `{}`                                                |
| base-url      | Base URL. Attempts to remove this prefix when saving after successful upload; concatenates this prefix when displaying if not an absolute path | `String`                  | ""                                                  |
| check-success | Custom success check function, accepts response object as parameter                                                                            | `Function`                | `res => res.code === 200 \|\| res.success === true` |
| response-path | Path to file URL in response, supports deep nesting (e.g. `data.url`)                                                                          | `String`                  | "data"                                              |
| error-field   | Path to error message in response                                                                                                              | `String`                  | "msg"                                               |

### Events

| Event Name        | Description                          | Callback Parameters |
| ----------------- | ------------------------------------ | ------------------- |
| update:modelValue | Triggered when binding value changes | `(value: string)`   |

## Features

1. **Auto Extract URL**: No need to handle `on-success` manually, just configure via `response-path`.
2. **Multiple File Support**: Built-in multiple file upload support, controlled via `limit`.
3. **Format Validation**: Automatic extension matching based on `file-type`.
4. **Path Handling**: Conveniently handle image server prefix via `base-url`.
