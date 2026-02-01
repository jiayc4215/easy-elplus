<template>
  <div class="demo-upload">
    <easy-file-upload
      v-model="fileList"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :limit="3"
      :file-size="2"
      :file-type="['png', 'jpg', 'jpeg', 'pdf']"
    />
    <div style="margin-top: 20px">绑定值: {{ fileList }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyFileUpload } from "easy-elplus"

const fileList = ref("")
</script>

<style scoped>
.demo-upload {
  width: 100%;
}
</style>
