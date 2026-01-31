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
    <!-- 上传提示 -->
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

defineOptions({
  name: "EasyImageUpload"
})

const props = defineProps({
  modelValue: [String, Object, Array],
  // 图片数量限制
  limit: {
    type: Number,
    default: 5
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ["png", "jpg", "jpeg"]
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
  // 图片基础路径
  baseUrl: {
    type: String,
    default: ""
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

watch(
  () => props.modelValue,
  val => {
    if (val) {
      // 首先将值转为数组
      const list = Array.isArray(val) ? val : val.split(",")
      // 然后将数组转为对象数组
      fileList.value = list.map(item => {
        if (typeof item === "string") {
          let url = item
          if (url.indexOf("https://") === -1 && url.indexOf("http://") === -1 && props.baseUrl) {
            url = props.baseUrl + item
          }
          item = { name: item, url: url }
        }
        return item
      })
    } else {
      fileList.value = []
    }
  },
  { deep: true, immediate: true }
)

// 上传前校验
function handleBeforeUpload(file) {
  let isImg = false
  if (props.fileType.length) {
    let fileExtension = ""
    if (file.name.lastIndexOf(".") > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1)
    }
    isImg = props.fileType.some(type => {
      if (file.type.indexOf(type) > -1) return true
      if (fileExtension && fileExtension.toLowerCase().indexOf(type.toLowerCase()) > -1) return true
      return false
    })
  } else {
    isImg = file.type.indexOf("image") > -1
  }

  if (!isImg) {
    ElMessage.error(`文件格式不正确, 请上传${props.fileType.join("/")}图片格式文件!`)
    return false
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      ElMessage.error(`上传图片大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  number.value++
  return true
}

// 文件个数超出
function handleExceed() {
  ElMessage.error(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  // 暂时保留对常见结构的兼容
  const url = res.data || res.url
  if (res.code === 200 || res.success || !res.code) {
    uploadList.value.push({ name: getFileName(url), url: url })
    uploadedSuccessfully()
  } else {
    number.value--
    ElMessage.error(res.msg || "上传失败")
    imageUploadRef.value.handleRemove(file)
    uploadedSuccessfully()
  }
}

// 删除图片
function handleRemove(file) {
  const findex = fileList.value.map(f => f.name).indexOf(file.name)
  if (findex > -1) {
    fileList.value.splice(findex, 1)
    emit("update:modelValue", listToString(fileList.value))
  }
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit("update:modelValue", listToString(fileList.value))
  }
}

// 上传失败
function handleUploadError() {
  ElMessage.error("上传图片失败")
}

// 预览
function handlePictureCardPreview(file) {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 获取文件名称
function getFileName(name) {
  if (typeof name !== "string") return ""
  if (name.lastIndexOf("/") > -1) {
    return name.slice(name.lastIndexOf("/") + 1)
  } else {
    return name
  }
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
  let strs = ""
  separator = separator || ","
  for (let i in list) {
    if (list[i].url && list[i].url.indexOf("blob:") !== 0) {
      let url = list[i].url
      if (props.baseUrl && url.indexOf(props.baseUrl) === 0) {
        url = url.replace(props.baseUrl, "")
      }
      strs += url + separator
    }
  }
  return strs !== "" ? strs.substr(0, strs.length - 1) : ""
}
</script>

<style scoped>
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
