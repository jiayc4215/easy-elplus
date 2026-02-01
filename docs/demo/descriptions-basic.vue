<template>
  <div class="descriptions-demo">
    <h3>基础用法</h3>
    <easy-descriptions :items="basicItems" v-model="formData" :column="2" border />

    <h3 style="margin-top: 30px">分组模式</h3>
    <easy-descriptions :items="groupedItems" v-model="formData" border />

    <div class="actions">
      <el-button type="primary" @click="handleSubmit">提交数据</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

    <div v-if="submitResult" class="result">
      <strong>提交的数据：</strong>
      <pre>{{ submitResult }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyDescriptions } from "easy-elplus"
import { ElMessage, ElButton } from "element-plus"

const formData = ref({
  username: "张三",
  gender: 1,
  age: 25,
  tel: "18100000000",
  email: "zhangsan@example.com",
  address: "上海市普陀区金沙江路 1518 弄",
  isVip: true,
  vipLevel: "Gold",
  remark: "这是一个备注信息"
})

const submitResult = ref("")

// 基础配置
const basicItems = [
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
  { label: "年龄", value: "age" },
  { label: "手机号", value: "tel" },
  {
    label: "邮箱",
    value: {
      id: "email",
      components: "el-input",
      placeholder: "请输入邮箱"
    }
  },
  { label: "地址", value: "address", span: 2 }
]

// 分组配置
const groupedItems = [
  {
    title: "基本信息",
    column: 2,
    items: [
      { label: "用户名", value: "username" },
      {
        label: "性别",
        value: {
          id: "gender",
          components: "el-tag",
          type: formData.value.gender ? "primary" : "danger",
          render: () => (formData.value.gender ? "男" : "女")
        }
      },
      { label: "年龄", value: "age" },
      { label: "手机号", value: "tel" }
    ]
  },
  {
    title: "联系方式",
    column: 1,
    items: [
      { label: "邮箱", value: "email" },
      { label: "地址", value: "address" }
    ]
  },
  {
    title: "VIP 信息",
    hidden: data => !data.isVip,
    column: 2,
    items: [
      { label: "VIP 等级", value: "vipLevel" },
      {
        label: "备注",
        value: {
          id: "remark",
          components: "el-input",
          type: "textarea",
          rows: 3
        },
        span: 2
      }
    ]
  }
]

const handleSubmit = () => {
  submitResult.value = JSON.stringify(formData.value, null, 2)
  ElMessage.success("提交成功")
}

const handleReset = () => {
  formData.value = {
    username: "",
    gender: 1,
    age: 0,
    tel: "",
    email: "",
    address: "",
    isVip: false,
    vipLevel: "",
    remark: ""
  }
  submitResult.value = ""
  ElMessage.info("已重置")
}
</script>

<style scoped>
.descriptions-demo {
  padding: 20px;
}

h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  color: #303133;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.result {
  margin-top: 20px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #409eff;
  font-size: 14px;
}

.result pre {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.5;
}
</style>
