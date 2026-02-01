<template>
  <div class="custom-footer">
    <span class="footer-hint">这是一个完全自定义的页脚 -></span>
    <div class="footer-btns">
      <el-button size="small" @click="close">直接关闭</el-button>
      <el-button type="danger" size="small" :loading="loading" @click="confirm"> 执行确认 </el-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  close: Function,
  confirm: Function,
  loading: Boolean
})
</script>

<style scoped>
.custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.footer-hint {
  color: #999;
  font-size: 13px;
}
.footer-btns {
  display: flex;
  gap: 8px;
}
</style>
