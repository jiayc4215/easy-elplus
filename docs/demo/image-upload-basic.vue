<template>
  <div class="demo-upload">
    <easy-image-upload
      v-model="imageList"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :limit="3"
      :file-size="2"
    />
    <div style="margin-top: 20px">绑定值: {{ imageList }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { EasyImageUpload } from "easy-elplus"

const imageList = ref("")
</script>

<style scoped>
.demo-upload {
  width: 100%;
}
</style>
