<script setup>
import { ref, useAttrs } from "vue"
import { ElButton } from "element-plus"
import { omit } from "lodash-es"
import { isFunction } from "@easy-elplus/utils"

defineOptions({
  inheritAttrs: false,
  name: "EasyButton"
})

const loading = ref(false)

const attrs = useAttrs()
const onClick = async () => {
  try {
    loading.value = true

    if (isFunction(attrs.onClick)) {
      await attrs.onClick()
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-button :loading="loading" v-bind="omit(attrs, 'onClick')" @click="onClick">
    <slot />
  </el-button>
</template>
