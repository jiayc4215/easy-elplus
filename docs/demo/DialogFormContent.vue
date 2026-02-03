<template>
  <el-form ref="formRef" :model="formData" label-width="80px">
    <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
      <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item
      label="邮箱"
      prop="email"
      :rules="[
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue"
import { ElForm, ElFormItem, ElInput } from "element-plus"

const formRef = ref(null)
const formData = reactive({
  name: "",
  email: ""
})

// 暴露给外部的方法
const validateForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate()
  return formData
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

// 模拟一个内部业务方法
const doSomethingInternal = () => {
  console.log("组件内部方法被调用了", formData)
  return "Internal Result"
}

defineExpose({
  validateForm,
  resetForm,
  doSomethingInternal,
  // 如果配合 EasyDialog 默认行为，可以暴露 submit 方法
  submit: validateForm
})
</script>
