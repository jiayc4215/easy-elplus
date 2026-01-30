<script setup>
import { useDynamicComponent } from "@easy-elplus/hooks"

defineOptions({
  name: "EasyDescriptionsComp"
})

defineProps({
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
</script>

<template>
  <slot :name="components">
    <component
      v-if="id"
      :is="getComponent(components, descriptionsData)"
      v-model="descriptionsData[id]"
      v-bind="props"
    />

    <component v-else :is="getComponent(components)" v-bind="props" />
  </slot>
</template>
