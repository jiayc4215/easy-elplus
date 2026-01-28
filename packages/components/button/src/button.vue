<script setup>
import { ref, useAttrs } from "vue"
import { ElButton } from "element-plus"

import { isFunction } from "@easy-elplus/utils"

defineOptions({
  inheritAttrs: false,
  name: "EasyButton"
})

const props = defineProps({
  onClick: {
    type: Function,
    default: () => {}
  }
})

const loading = ref(false)

const attrs = useAttrs()
const handleClick = async () => {
  try {
    loading.value = true

    if (isFunction(props.onClick)) {
      await props.onClick()
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-button :loading="loading" v-bind="attrs" @click="handleClick">
    <slot />
  </el-button>
</template>
