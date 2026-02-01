<template>
  <div class="button-demo">
    <h3>基础按钮</h3>
    <div class="button-group">
      <easy-button @click="onClick">默认按钮</easy-button>
      <easy-button type="primary" @click="onClick">主要按钮</easy-button>
      <easy-button type="success" @click="onClick">成功按钮</easy-button>
      <easy-button type="info" @click="onClick">信息按钮</easy-button>
      <easy-button type="warning" @click="onClick">警告按钮</easy-button>
      <easy-button type="danger" @click="onClick">危险按钮</easy-button>
    </div>

    <h3>自动加载状态</h3>
    <div class="button-group">
      <easy-button type="primary" @click="handleAsyncClick"> 异步操作 (1秒) </easy-button>
      <easy-button type="success" @click="handleLongAsync"> 长时间操作 (3秒) </easy-button>
    </div>

    <h3>不同尺寸</h3>
    <div class="button-group">
      <easy-button size="large" @click="onClick">大型按钮</easy-button>
      <easy-button @click="onClick">默认按钮</easy-button>
      <easy-button size="small" @click="onClick">小型按钮</easy-button>
    </div>

    <h3>禁用状态</h3>
    <div class="button-group">
      <easy-button disabled>禁用按钮</easy-button>
      <easy-button type="primary" disabled>主要按钮</easy-button>
    </div>

    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyButton } from "easy-elplus"

const message = ref("")

const onClick = () => {
  message.value = "按钮被点击了！"
  setTimeout(() => {
    message.value = ""
  }, 2000)
}

const handleAsyncClick = async () => {
  message.value = "开始异步操作..."
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.value = "异步操作完成！"
  setTimeout(() => {
    message.value = ""
  }, 2000)
}

const handleLongAsync = async () => {
  message.value = "开始长时间操作..."
  await new Promise(resolve => setTimeout(resolve, 3000))
  message.value = "长时间操作完成！"
  setTimeout(() => {
    message.value = ""
  }, 2000)
}
</script>

<style scoped>
.button-demo {
  padding: 20px;
}

h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  color: #303133;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px;
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
