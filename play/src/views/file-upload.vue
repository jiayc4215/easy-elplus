<template>
  <div class="demo-container">
    <h1 class="demo-title">EasyFileUpload 文件上传演示</h1>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">基础用法</div>
      </template>
      <easy-file-upload
        v-model="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="3"
      />
      <div class="result-box">
        <h4>绑定值 (v-model):</h4>
        <code>{{ fileList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">携带 Token & 基础路径</div>
      </template>
      <easy-file-upload
        v-model="tokenFileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :headers="{ Authorization: 'Bearer demo-token' }"
        base-url="https://example.com/"
        :limit="5"
      />
      <div class="result-box">
        <h4>绑定值 (已自动去除 baseUrl):</h4>
        <code>{{ tokenFileList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">限制类型 & 大小</div>
      </template>
      <p class="demo-info">仅支持 .pdf/.doc/.docx 格式，单个文件不超过 2MB</p>
      <easy-file-upload
        v-model="restrictedList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :file-type="['pdf', 'doc', 'docx']"
        :file-size="2"
        :limit="2"
      />
      <div class="result-box">
        <h4>绑定值:</h4>
        <code>{{ restrictedList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">自定义响应路径</div>
      </template>
      <p class="demo-info">假设后端返回格式为: <code>{ success: true, result: { fileUrl: "xxx" } }</code></p>
      <easy-file-upload
        v-model="customResponseList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :check-success="res => res.success === true"
        response-path="result.fileUrl"
        error-field="message"
        :limit="3"
      />
      <div class="result-box">
        <h4>绑定值:</h4>
        <code>{{ customResponseList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">不显示提示信息</div>
      </template>
      <easy-file-upload
        v-model="noTipList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :is-show-tip="false"
        :limit="3"
      />
      <div class="result-box">
        <h4>绑定值:</h4>
        <code>{{ noTipList }}</code>
      </div>
    </el-card>

    <el-card class="demo-card">
      <template #header>
        <div class="card-header">预设文件列表</div>
      </template>
      <p class="demo-info">可以通过 v-model 预设已有的文件列表</p>
      <easy-file-upload
        v-model="presetList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        base-url="https://example.com/"
        :limit="5"
      />
      <div class="result-box">
        <h4>绑定值:</h4>
        <code>{{ presetList }}</code>
      </div>
      <el-button @click="resetPresetList" style="margin-top: 10px">重置预设列表</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue"

const fileList = ref("")
const tokenFileList = ref("")
const restrictedList = ref("")
const customResponseList = ref("")
const noTipList = ref("")
const presetList = ref("files/document1.pdf,files/document2.docx,files/report.xlsx")

function resetPresetList() {
  presetList.value = "files/document1.pdf,files/document2.docx,files/report.xlsx"
}
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
.demo-info code {
  background: #f5f7fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
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
