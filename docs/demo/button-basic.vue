<template>
  <div class="button-group">
    <EasyButton @click="handleLongAsync">Default</EasyButton>
    <EasyButton type="primary" @click="handleLongAsync">Primary</EasyButton>
    <EasyButton type="success" @click="handleLongAsync">Success</EasyButton>
    <EasyButton type="info" @click="handleLongAsync">Info</EasyButton>
    <EasyButton type="warning" @click="handleLongAsync">Warning</EasyButton>
    <EasyButton type="danger" @click="handleLongAsync">Danger</EasyButton>
  </div>

  <div v-if="message" class="message">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyButton } from "easy-elplus"

const message = ref("")

const handleLongAsync = async () => {
  message.value = "异步操作开始..."
  await new Promise(resolve => setTimeout(resolve, 3000))
  message.value = "异步操作完成！"
  setTimeout(() => {
    message.value = ""
  }, 2000)
}
</script>

<style scoped>
h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  color: #303133;
}

.message {
  margin-top: 20px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  color: #409eff;
  font-size: 14px;
}
</style>
