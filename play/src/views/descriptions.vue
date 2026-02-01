<script setup lang="ts">
import { h, ref } from "vue"
import { ElCheckboxGroup, ElTag, ElButton, ElDivider } from "element-plus"
import { EasyDescriptions } from "easy-elplus"
import HeaderComp from "../testComp/HeaderComp.vue"
import AgeComp from "../testComp/AgeComp.vue"

const descriptionsData = ref({
  date: "2026-01-30",
  name: "贾公子",
  genderType: 1,
  gender: 0,
  age: 35,
  city: 3,
  course: "自定义标签",
  price: "自定义标签",
  state: [0],
  // 测试空值显示
  address: "",
  phone: null,
  email: undefined
})

const items = [
  // 普通项
  {
    label: "姓名",
    value: "name"
  },

  // 测试空值显示 - 空字符串
  {
    label: "地址",
    value: "address"
  },

  // 测试空值显示 - null
  {
    label: "电话",
    value: "phone"
  },

  // 测试空值显示 - undefined
  {
    label: "邮箱",
    value: "email"
  },

  // 自定义-插槽
  {
    label: "course",
    value: "price"
  },

  // 自定义-函数组件
  {
    span: 2,
    label: {
      components: () => h(ElTag, { type: "warning" }, () => "状态")
    },
    value: {
      id: "state",
      components: () =>
        h(ElCheckboxGroup, {
          options: [
            {
              label: "未付款",
              value: 0
            },
            {
              label: "已付款",
              value: 1
            },
            {
              label: "已发货",
              value: 2
            }
          ]
        })
    }
  },

  // 自定义-组件对象
  {
    label: {
      components: HeaderComp
    },
    value: {
      id: "age",
      components: AgeComp
    }
  },

  // 自定义-动态组件
  {
    label: {
      id: "genderType",
      components: "el-switch",
      props: {
        activeText: "性别",
        inactiveText: "爱好",
        activeValue: 1,
        inactiveValue: 0
      }
    },
    value: {
      id: "gender",
      components: "el-switch",
      props: {
        activeText: "男",
        inactiveText: "女",
        activeValue: 1,
        inactiveValue: 0
      }
    }
  },

  {
    label: "时间",
    value: "date",
    hidden: data => data.gender === 1
  }
]

const groupItems = [
  {
    title: "基本信息",
    extra: "extra",
    column: 2,
    items: [
      { label: "姓名", value: "name", "label-class-name": "my-label", "class-name": "my-content" },
      { label: "年龄", value: "age" }
    ]
  },
  {
    title: "配置信息",
    // 测试分组隐藏：当 gender 为 1 (男) 时隐藏该组
    hidden: data => data.gender === 1,
    items: [{ label: "城市", value: "city" }]
  }
]
</script>

<template>
  <div>
    <EasyDescriptions v-model="descriptionsData" :items="items" border>
      <!-- 标题插槽 -->
      <template #title>
        <el-tag type="danger" size="large">用户信息</el-tag>
      </template>

      <!-- 操作区插槽 -->
      <template #extra>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="success" size="small">保存</el-button>
      </template>

      <!-- 自定义内容插槽 -->
      <template #course>
        <el-tag type="primary" size="large">
          {{ descriptionsData.course }}
        </el-tag>
      </template>

      <template #price>
        <el-tag type="success" size="large">
          {{ descriptionsData.price }}
        </el-tag>
      </template>
    </EasyDescriptions>

    <el-divider>分组模式</el-divider>

    <EasyDescriptions v-model="descriptionsData" :items="groupItems" border>
      <!-- 分组标题自定义 -->
      <template #title="{ group }">
        <span v-if="group.title === '基本信息'"> <i class="el-icon-user"></i> {{ group.title }} (自定义) </span>
      </template>

      <!-- 分组操作区自定义 -->
      <template #extra="{ group }">
        <el-button v-if="group.title === '配置信息'" type="warning" size="small">配置</el-button>
      </template>
    </EasyDescriptions>
  </div>
</template>
<style scoped>
:deep(.my-label) {
  background: red !important;
}
:deep(.my-content) {
  background: yellow !important;
}
</style>
