<script setup>
import { computed } from "vue"
import { useDynamicComponent } from "@easy-elplus/hooks"

defineOptions({
  name: "EasyDescriptionsComp"
})

const componentProps = defineProps({
  id: {
    type: String,
    default: ""
  },
  components: {
    type: [String, Number, Function, Object],
    default: ""
  },
  props: {
    type: Object,
    default: () => ({})
  }
})

const descriptionsData = defineModel("modelValue")
const { getComponent } = useDynamicComponent()

// 1. 动态计算要渲染的组件
const currentComponent = computed(() => {
  return componentProps.id
    ? getComponent(componentProps.components, descriptionsData.value)
    : getComponent(componentProps.components)
})

// 2. 动态构建 Model 绑定 (仅在有 id 时绑定)
const dynamicModel = computed(() => {
  return componentProps.id ? { modelValue: descriptionsData.value[componentProps.id] } : {}
})
</script>

<template>
  <slot :name="components">
    <component
      :is="currentComponent"
      v-bind="{ ...dynamicModel, ...props }"
      @update:modelValue="val => id && (descriptionsData[id] = val)"
    />
  </slot>
</template>
