<script setup lang="ts">
import { ElInputNumber } from "element-plus"

const value = defineModel()
</script>

<template>
  <el-input-number v-model="value" />
</template>
