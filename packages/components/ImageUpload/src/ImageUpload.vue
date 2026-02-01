<template>
  <div class="component-upload-image">
    <el-upload
      ref="imageUploadRef"
      multiple
      :action="action"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :class="{ hide: fileList.length >= limit }"
    >
      <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <div v-if="showTip" class="el-upload__tip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      的文件
    </div>

    <el-dialog v-model="dialogVisible" title="预览" width="800px" append-to-body>
      <img :src="dialogImageUrl" style="display: block; max-width: 100%; margin: 0 auto" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { ElMessage } from "element-plus"
import { Plus } from "@element-plus/icons-vue"

defineOptions({ name: "EasyImageUpload" })

const props = defineProps({
  modelValue: [String, Object, Array],
  limit: { type: Number, default: 5 },
  fileSize: { type: Number, default: 5 },
  fileType: { type: Array, default: () => ["png", "jpg", "jpeg"] },
  isShowTip: { type: Boolean, default: true },
  action: { type: String, required: true },
  headers: { type: Object, default: () => ({}) },
  baseUrl: { type: String, default: "" },

  checkSuccess: {
    type: Function,
    default: res => res.code === 200 || res.success === true
  },
  // 自定义提取图片地址的路径，支持 "data.url" 这种深层嵌套
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

const emit = defineEmits(["update:modelValue"])

const number = ref(0)
const uploadList = ref([])
const dialogImageUrl = ref("")
const dialogVisible = ref(false)
const fileList = ref([])
const imageUploadRef = ref(null)

const showTip = computed(() => props.isShowTip && (props.fileType || props.fileSize))

// 深度解析对象属性 (例如把 res["data.imgUrl"] 转为 res.data.imgUrl)
const getDeepValue = (obj, path) => {
  if (!path) return obj
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      const list = Array.isArray(val) ? val : val.split(",")
      fileList.value = list.map(item => {
        if (typeof item === "string") {
          let url = item
          if (!/^https?:\/\//.test(url) && props.baseUrl) {
            url = props.baseUrl + item
          }
          item = { name: getFileName(item), url: url }
        }
        return item
      })
    } else {
      fileList.value = []
    }
  },
  { deep: true, immediate: true }
)

function handleBeforeUpload(file) {
  let isImg = false
  if (props.fileType.length) {
    const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase()
    isImg = props.fileType.map(t => t.toLowerCase()).includes(fileExtension)
  } else {
    isImg = file.type.indexOf("image") > -1
  }

  if (!isImg) {
    ElMessage.error(`格式不正确, 请上传${props.fileType.join("/")}图片!`)
    return false
  }
  if (props.fileSize && file.size / 1024 / 1024 > props.fileSize) {
    ElMessage.error(`大小不能超过 ${props.fileSize} MB!`)
    return false
  }
  number.value++
  return true
}

function handleExceed() {
  ElMessage.error(`上传数量不能超过 ${props.limit} 个!`)
}

// 修改后的核心逻辑
function handleUploadSuccess(res, file) {
  // 1. 使用传入的校验函数
  if (props.checkSuccess(res)) {
    // 2. 动态提取 URL
    const url = getDeepValue(res, props.responsePath)

    if (url) {
      uploadList.value.push({ name: getFileName(url), url: url })
      uploadedSuccessfully()
    } else {
      handleUploadError(`无法从响应中解析图片路径: ${props.responsePath}`)
    }
  } else {
    number.value--
    const errorMsg = getDeepValue(res, props.errorField) || "上传失败"
    ElMessage.error(errorMsg)
    imageUploadRef.value.handleRemove(file)
    uploadedSuccessfully()
  }
}

function handleRemove(file) {
  const findex = fileList.value.findIndex(f => f.name === file.name)
  if (findex > -1) {
    fileList.value.splice(findex, 1)
    emit("update:modelValue", listToString(fileList.value))
  }
}

function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit("update:modelValue", listToString(fileList.value))
  }
}

function handleUploadError(msg) {
  ElMessage.error(typeof msg === "string" ? msg : "上传图片失败")
  number.value--
}

function handlePictureCardPreview(file) {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

function getFileName(name) {
  if (typeof name !== "string") return ""
  return name.slice(name.lastIndexOf("/") + 1)
}

function listToString(list, separator = ",") {
  return list
    .filter(item => item.url && item.url.indexOf("blob:") !== 0)
    .map(item => {
      let url = item.url
      if (props.baseUrl && url.indexOf(props.baseUrl) === 0) {
        url = url.replace(props.baseUrl, "")
      }
      return url
    })
    .join(separator)
}
</script>

<style scoped>
/* 保持原有样式 */
.component-upload-image :deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
  line-height: 110px;
}
.component-upload-image :deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100px;
  height: 100px;
}
.component-upload-image :deep(.hide .el-upload--picture-card) {
  display: none;
}
</style>
