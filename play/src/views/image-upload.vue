<template>
  <div class="demo-container">
    <h1 class="demo-title">EasyImageUpload 图片上传演示</h1>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">基础用法</div>
      </template>
      <easy-image-upload
        v-model="imageList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="3"
      />
      <div class="result-box">
        <h4>绑定值 (v-model):</h4>
        <code>{{ imageList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">携带 Token & 基础路径</div>
      </template>
      <easy-image-upload
        v-model="tokenImageList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :headers="{ Authorization: 'Bearer demo-token' }"
        base-url="https://fuss10.elemecdn.com/"
        :limit="5"
      />
      <div class="result-box">
        <h4>绑定值 (已自动去除 baseUrl):</h4>
        <code>{{ tokenImageList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">限制类型 & 大小</div>
      </template>
      <p class="demo-info">仅支持 .png 格式，单张不超过 1MB</p>
      <easy-image-upload
        v-model="restrictedList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :file-type="['png']"
        :file-size="1"
        :limit="2"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue"

const imageList = ref("3/7c/3ea6beec64369c2642b92c6726f1epng.png,2/e2/27e722544c057b5f30b9d62d46695png.png")
const tokenImageList = ref("3/7c/3ea6beec64369c2642b92c6726f1epng.png")
const restrictedList = ref("")
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
.demo-title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #303133;
}
.demo-card {
  margin-bottom: 24px;
}
.card-header {
  font-weight: bold;
}
.demo-info {
  font-size: 14px;
  color: #909399;
  margin-bottom: 12px;
}
.result-box {
  margin-top: 20px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}
.result-box h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #606266;
}
.result-box code {
  color: #409eff;
  word-break: break-all;
  font-family: monospace;
}
</style>
