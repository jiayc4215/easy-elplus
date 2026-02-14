<template>
  <div class="component-upload-file">
    <el-upload
      ref="fileUploadRef"
      multiple
      :action="action"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-remove="handleRemove"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
    >
      <!-- 上传按钮 -->
      <el-button type="primary">
        <el-icon class="el-icon--left"><Upload /></el-icon>
        选取文件
      </el-button>
    </el-upload>

    <!-- 上传提示 -->
    <div v-if="showTip" class="el-upload__tip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType && fileType.length">
        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      的文件
    </div>

    <!-- 文件列表 -->
    <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li
        v-for="(file, index) in fileList"
        :key="file.uid || index"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <el-link :href="getFileUrl(file.url)" underline="never" target="_blank">
          <el-icon class="el-icon--left"><Document /></el-icon>
          <span>{{ getFileName(file.name) }}</span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link underline="never" @click="handleDelete(index)" type="danger">删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { ElMessage, ElUpload, ElButton, ElIcon, ElLink } from "element-plus"
import { Upload, Document } from "@element-plus/icons-vue"
import { isString } from "@easy-elplus/utils"
import { UPDATE_MODEL_EVENT } from "@easy-elplus/constants"

defineOptions({ name: "EasyFileUpload" })

const props = defineProps({
  modelValue: [String, Object, Array],
  // 数量限制
  limit: {
    type: Number,
    default: 5
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5
  },
  // 文件类型, 例如['doc', 'xls', 'ppt', 'txt', 'pdf']
  fileType: {
    type: Array,
    default: () => ["doc", "xls", "ppt", "txt", "pdf"]
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
  // 上传地址
  action: {
    type: String,
    required: true
  },
  // 请求头
  headers: {
    type: Object,
    default: () => ({})
  },
  // 基础路径
  baseUrl: {
    type: String,
    default: ""
  },
  // 自定义成功校验函数
  checkSuccess: {
    type: Function,
    default: res => res.code === 200 || res.success === true
  },
  // 自定义提取文件地址的路径，支持 "data.url" 这种深层嵌套
  responsePath: {
    type: String,
    default: "data"
  },
  // 错误消息提取字段
  errorField: {
    type: String,
    default: "msg"
  }
})

const emit = defineEmits([UPDATE_MODEL_EVENT])

const number = ref(0)
const uploadList = ref([])
const fileList = ref([])
const fileUploadRef = ref(null)

const showTip = computed(() => props.isShowTip && (props.fileType || props.fileSize))

// 深度解析对象属性 (例如把 res["data.url"] 转为 res.data.url)
const getDeepValue = (obj, path) => {
  if (!path) return obj
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      const list = Array.isArray(val) ? val : val.split(",")
      fileList.value = list.map((item, index) => {
        if (isString(item)) {
          item = { name: getFileName(item), url: item, uid: new Date().getTime() + index }
        }
        return item
      })
    } else {
      fileList.value = []
    }
  },
  { deep: true, immediate: true }
)

// 上传前校检格式和大小
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType && props.fileType.length) {
    const fileName = file.name.split(".")
    const fileExt = fileName[fileName.length - 1].toLowerCase()
    const isTypeOk = props.fileType.map(t => t.toLowerCase()).includes(fileExt)
    if (!isTypeOk) {
      ElMessage.error(`文件格式不正确, 请上传${props.fileType.join("/")}格式文件!`)
      return false
    }
  }
  // 校检文件大小
  if (props.fileSize && file.size / 1024 / 1024 > props.fileSize) {
    ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`)
    return false
  }
  number.value++
  return true
}

// 文件个数超出
function handleExceed() {
  ElMessage.error(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传失败
function handleUploadError(err) {
  number.value--
  ElMessage.error(isString(err) ? err : "上传文件失败")
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  // 使用传入的校验函数
  if (props.checkSuccess(res)) {
    // 动态提取 URL
    const url = getDeepValue(res, props.responsePath)

    if (url) {
      uploadList.value.push({ name: getFileName(url), url: url, uid: file.uid })
      uploadedSuccessfully()
    } else {
      handleUploadError(`无法从响应中解析文件路径: ${props.responsePath}`)
    }
  } else {
    number.value--
    const errorMsg = getDeepValue(res, props.errorField) || "上传失败"
    ElMessage.error(errorMsg)
    fileUploadRef.value?.handleRemove(file)
    uploadedSuccessfully()
  }
}

// 删除文件
function handleDelete(index) {
  fileList.value.splice(index, 1)
  emit(UPDATE_MODEL_EVENT, listToString(fileList.value))
}

// 移除文件
function handleRemove(file) {
  const findex = fileList.value.findIndex(f => f.uid === file.uid)
  if (findex > -1) {
    fileList.value.splice(findex, 1)
    emit(UPDATE_MODEL_EVENT, listToString(fileList.value))
  }
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit(UPDATE_MODEL_EVENT, listToString(fileList.value))
  }
}

// 获取文件名称
function getFileName(name) {
  if (!isString(name)) return ""
  return name.slice(name.lastIndexOf("/") + 1)
}

// 获取文件完整 URL
function getFileUrl(url) {
  if (!url) return ""
  if (/^https?:\/\//.test(url)) return url
  return props.baseUrl ? props.baseUrl + url : url
}

// 对象转成指定字符串分隔
function listToString(list, separator = ",") {
  return list
    .filter(item => item.url && item.url.indexOf("blob:") !== 0)
    .map(item => {
      let url = item.url
      // 如果设置了 baseUrl，保存时去除它
      if (props.baseUrl && url.indexOf(props.baseUrl) === 0) {
        url = url.replace(props.baseUrl, "")
      }
      return url
    })
    .join(separator)
}
</script>

<style scoped lang="scss">
.component-upload-file {
  .upload-file-uploader {
    margin-bottom: 5px;
  }

  .el-upload__tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }

  .upload-file-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .el-upload-list__item {
      border: 1px solid #e4e7ed;
      line-height: 2;
      margin-bottom: 10px;
      position: relative;
      border-radius: 4px;
      padding: 8px 10px;
      transition: all 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }
    }

    .ele-upload-list__item-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: inherit;

      .el-link {
        flex: 1;
        margin-right: 10px;
      }
    }

    .ele-upload-list__item-content-action .el-link {
      margin-right: 10px;
    }
  }
}
</style>
