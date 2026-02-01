---
title: Descriptions 描述列表
description: 增强的描述列表组件,支持分组、动态渲染等
---

# Descriptions 描述列表

EasyDescriptions 是基于 Element Plus Descriptions 组件封装的增强版本,支持分组、动态组件、条件渲染等功能。

## 在线演示

<preview path="../demo/descriptions-basic.vue" title="Descriptions 基础示例" description="展示 Descriptions 组件的各种用法"></preview>

## 基础用法

```vue
<template>
  <easy-descriptions :items="items" v-model="formData" />
</template>

<script setup>
import { ref } from "vue"
import { EasyDescriptions } from "easy-elplus"

const formData = ref({
  username: "张三",
  tel: "18100000000",
  address: "上海市普陀区金沙江路 1518 弄"
})

const items = [
  { label: "用户名", value: "username" },
  { label: "手机号", value: "tel" },
  { label: "居住地", value: "address" }
]
</script>
```

## 自定义渲染

### 使用组件名

```javascript
const items = [
  {
    label: "用户名",
    value: {
      id: "username",
      components: "el-input", // 使用 Element Plus 组件
      placeholder: "请输入用户名"
    }
  },
  {
    label: "性别",
    value: {
      id: "gender",
      components: "el-radio-group",
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 0 }
      ]
    }
  }
]
```

### 使用插槽

```vue
<template>
  <easy-descriptions :items="items" v-model="formData">
    <template #username="{ modelValue }">
      <el-input v-model="modelValue.username" placeholder="自定义输入框" />
    </template>
  </easy-descriptions>
</template>

<script setup>
const items = [
  {
    label: "用户名",
    value: {
      id: "username",
      components: "username" // 对应插槽名
    }
  }
]
</script>
```

## 分组模式

支持将描述列表分组显示:

```vue
<template>
  <easy-descriptions :items="groupedItems" v-model="formData" />
</template>

<script setup>
const groupedItems = [
  {
    title: "基本信息",
    column: 2,
    items: [
      { label: "用户名", value: "username" },
      { label: "手机号", value: "tel" }
    ]
  },
  {
    title: "详细信息",
    column: 1,
    items: [
      { label: "地址", value: "address" },
      { label: "备注", value: "remark" }
    ]
  }
]
</script>
```

## 条件显示

### 隐藏字段

```javascript
const items = [
  { label: "用户名", value: "username" },
  {
    label: "管理员权限",
    value: "isAdmin",
    hidden: data => !data.isAdmin // 根据数据动态隐藏
  }
]
```

### 隐藏分组

```javascript
const groupedItems = [
  {
    title: '基本信息',
    items: [...]
  },
  {
    title: '高级设置',
    hidden: (data) => !data.isVip,  // 非VIP用户隐藏此分组
    items: [...]
  }
]
```

## 自定义标题和操作区

```vue
<template>
  <easy-descriptions :items="groupedItems" v-model="formData">
    <template #title="{ group, index }">
      <span style="color: #409eff">{{ group.title }}</span>
    </template>

    <template #extra="{ group }">
      <el-button size="small">编辑</el-button>
    </template>
  </easy-descriptions>
</template>

<script setup>
const groupedItems = [
  {
    title: '用户信息',
    extra: '操作区',  // 也可以直接设置文本
    items: [...]
  }
]
</script>
```

## 完整示例

```vue
<template>
  <div style="padding: 20px">
    <easy-descriptions :items="items" v-model="formData" :column="2" border>
      <!-- 自定义插槽 -->
      <template #avatar="{ modelValue }">
        <el-avatar :src="modelValue.avatar" />
      </template>
    </easy-descriptions>

    <div style="margin-top: 20px">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyDescriptions } from "easy-elplus"
import { ElMessage } from "element-plus"

const formData = ref({
  username: "张三",
  gender: 1,
  age: 25,
  tel: "18100000000",
  email: "zhangsan@example.com",
  address: "上海市普陀区金沙江路 1518 弄",
  isVip: true,
  avatar: "https://example.com/avatar.jpg"
})

const items = [
  {
    title: "基本信息",
    column: 2,
    items: [
      {
        label: "头像",
        value: {
          id: "avatar",
          components: "avatar" // 使用插槽
        }
      },
      {
        label: "用户名",
        value: {
          id: "username",
          components: "el-input",
          placeholder: "请输入用户名"
        }
      },
      {
        label: "性别",
        value: {
          id: "gender",
          components: "el-radio-group",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 0 }
          ]
        }
      },
      { label: "年龄", value: "age" }
    ]
  },
  {
    title: "联系方式",
    column: 1,
    items: [
      { label: "手机号", value: "tel" },
      { label: "邮箱", value: "email" },
      { label: "地址", value: "address" }
    ]
  },
  {
    title: "VIP 信息",
    hidden: data => !data.isVip,
    items: [
      { label: "VIP 等级", value: "vipLevel" },
      { label: "到期时间", value: "vipExpire" }
    ]
  }
]

const handleSubmit = () => {
  console.log("提交数据:", formData.value)
  ElMessage.success("提交成功")
}
</script>
```

## API

### Attributes

| 参数                 | 说明           | 类型   | 默认值 |
| -------------------- | -------------- | ------ | ------ |
| items                | 描述列表配置   | Array  | []     |
| modelValue / v-model | 绑定的数据对象 | Object | {}     |

继承 Element Plus Descriptions 的所有属性,如:

| 参数      | 说明           | 类型    | 默认值     |
| --------- | -------------- | ------- | ---------- |
| column    | 一行显示的列数 | Number  | 3          |
| border    | 是否带有边框   | Boolean | false      |
| direction | 排列方向       | String  | horizontal |
| size      | 尺寸           | String  | default    |

### Items 配置

#### 单组模式

```typescript
interface Item {
  label: string | object // 标签文本或配置对象
  value: string | object // 字段名或配置对象
  hidden?: boolean | ((data) => boolean) // 是否隐藏
  span?: number // 占据的列数
}
```

#### 分组模式

```typescript
interface GroupItem {
  title?: string // 分组标题
  extra?: string // 操作区文本
  items: Item[] // 该组的字段列表
  hidden?: boolean | ((data) => boolean) // 是否隐藏整个分组
  column?: number // 该组的列数
  border?: boolean // 该组是否带边框
  // ... 其他 Descriptions 属性
}
```

#### Value 对象配置

```typescript
interface ValueConfig {
  id: string // 字段名
  components: string | Component // 组件名或组件
  placeholder?: string // 占位文本
  options?: Array // 选项列表(用于 select、radio-group 等)
  // ... 其他组件属性
}
```

### Events

继承 Element Plus Descriptions 的所有事件。

### Slots

| 插槽名 | 说明           | 参数             |
| ------ | -------------- | ---------------- |
| title  | 自定义标题     | { group, index } |
| extra  | 自定义操作区   | { group, index } |
| [id]   | 自定义字段内容 | { modelValue }   |

## 特性说明

### 自动双向绑定

通过 `v-model` 绑定数据对象,组件会自动处理数据的读写:

```vue
<easy-descriptions :items="items" v-model="formData" />
```

### 动态组件渲染

支持通过组件名字符串或组件对象渲染:

```javascript
{
  value: {
    id: 'username',
    components: 'el-input',  // 字符串
    // 或
    components: ElInput  // 组件对象
  }
}
```

### 条件渲染

支持字段级和分组级的条件渲染:

```javascript
// 字段级
{
  label: '管理员',
  value: 'isAdmin',
  hidden: (data) => !data.isAdmin
}

// 分组级
{
  title: 'VIP信息',
  hidden: (data) => !data.isVip,
  items: [...]
}
```

### 灵活的插槽系统

支持自定义标题、操作区和字段内容:

```vue
<template #title="{ group }">
  <custom-title :data="group" />
</template>

<template #extra="{ group }">
  <el-button>编辑</el-button>
</template>

<template #username="{ modelValue }">
  <custom-input v-model="modelValue.username" />
</template>
```

## 最佳实践

1. **简单展示**: 直接使用字符串配置
2. **表单编辑**: 使用组件配置实现可编辑的描述列表
3. **分组展示**: 使用分组模式组织复杂数据
4. **条件显示**: 使用 hidden 函数实现动态显示逻辑
5. **自定义渲染**: 使用插槽实现复杂的自定义需求
