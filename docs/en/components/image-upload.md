---
title: ImageUpload
description: Image upload component, supporting preview, delete, etc.
---

# ImageUpload

EasyImageUpload is an image upload component based on Element Plus Upload component, optimized for image upload scenarios.

## Online Demo

<preview path="../../demo/image-upload-basic.vue" title="ImageUpload Basic Example" description="Show basic features of image upload, including preview and auto parsing"></preview>

## API

### Attributes

| Attribute     | Description                                                                                                                                    | Type                      | Default                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------- |
| v-model       | Binding value, supports comma-separated string, object, or array                                                                               | `String / Object / Array` | —                                                   |
| action        | Upload URL (Required)                                                                                                                          | `String`                  | —                                                   |
| limit         | Max upload count                                                                                                                               | `Number`                  | 5                                                   |
| file-size     | Image size limit (MB)                                                                                                                          | `Number`                  | 5                                                   |
| file-type     | Allowed image extensions                                                                                                                       | `Array`                   | `["png", "jpg", "jpeg"]`                            |
| is-show-tip   | Whether to show upload tip                                                                                                                     | `Boolean`                 | true                                                |
| headers       | Request headers for upload                                                                                                                     | `Object`                  | `{}`                                                |
| base-url      | Base URL. Attempts to remove this prefix when saving after successful upload; concatenates this prefix when displaying if not an absolute path | `String`                  | ""                                                  |
| check-success | Custom success check function, accepts response object as parameter                                                                            | `Function`                | `res => res.code === 200 \|\| res.success === true` |
| response-path | Path to image URL in response, supports deep nesting (e.g. `data.url`)                                                                         | `String`                  | "data"                                              |
| error-field   | Path to error message in response                                                                                                              | `String`                  | "msg"                                               |

### Events

| Event Name        | Description                          | Callback Parameters |
| ----------------- | ------------------------------------ | ------------------- |
| update:modelValue | Triggered when binding value changes | `(value: string)`   |

## Features

1. **Auto Preview**: Click the thumbnail of uploaded image to view full image preview.
2. **Hide Upload Button**: Automatically hides the upload button when the number of uploaded images reaches `limit`.
3. **Format Validation**: Defaults to only allow `png`, `jpg`, `jpeg` formats.
4. **Path Handling**: Flexible handling of relative paths returned by backend with `base-url`.
