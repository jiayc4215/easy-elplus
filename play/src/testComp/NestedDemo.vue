<template>
  <div>
    <p>This is a nested component. You can open another dialog from here.</p>
    <el-button type="primary" @click="openSub">Open Sub Dialog</el-button>
  </div>
</template>

<script setup>
import { EasyDialog } from "easy-elplus"
import { ElButton } from "element-plus"

const openSub = () => {
  EasyDialog("This is the second layer dialog")
}
</script>
