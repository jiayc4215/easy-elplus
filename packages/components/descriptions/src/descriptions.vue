<script setup>
import { h, computed } from "vue"
import { ElDescriptions, ElDescriptionsItem } from "element-plus"
import { isObject, isFunction } from "@easy-elplus/utils"
import Comp from "./comp.vue"

defineOptions({
  name: "EasyDescriptions"
})

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const descriptionsData = defineModel("modelValue")

// 内部处理单个列表的函数
const normalizeItems = list => {
  return list.reduce((prev, item) => {
    const isHidden = isFunction(item.hidden) ? item.hidden(descriptionsData.value) : item.hidden

    if (isHidden) return prev

    prev.push({
      ...item,
      label: isObject(item.label)
        ? item.label
        : {
            components: item.label
          },
      value: isObject(item.value)
        ? item.value
        : {
            id: item.value,
            components: item.value
          }
    })

    return prev
  }, [])
}

const renderList = computed(() => {
  if (!props.items || props.items.length === 0) return []

  // 判断是否为分组模式：第一项包含 items 字段且是一个数组
  // 为了兼容性更好，这里假设如果 item 内部有 items 属性，则认为是分组
  const isGroup = props.items.some(item => item.items && Array.isArray(item.items))

  if (isGroup) {
    // 分组模式
    return props.items
      .filter(group => {
        const isHidden = isFunction(group.hidden) ? group.hidden(descriptionsData.value) : group.hidden
        return !isHidden
      })
      .map(group => {
        // 分离出内部使用的属性，其他的属性放入 bindProps 透传给 el-descriptions
        // eslint-disable-next-line no-unused-vars
        const { extra, items, hidden, ...rest } = group
        return {
          ...group,
          rows: normalizeItems(group.items),
          bindProps: rest
        }
      })
  } else {
    // 单组模式：包装成一个默认分组
    return [
      {
        rows: normalizeItems(props.items),
        bindProps: {}
      }
    ]
  }
})

defineExpose({})
</script>

<template>
  <div class="epl-descriptions">
    <template v-for="(group, index) in renderList" :key="index">
      <el-descriptions v-bind="{ ...$attrs, ...group.bindProps }" style="margin-bottom: 20px">
        <!-- 标题插槽 (支持作用域插槽透传 group 数据) -->
        <template v-if="group.title || $slots.title" #title>
          <template v-if="group.title">
            {{ group.title }}
          </template>
          <slot v-else name="title" :group="group" :index="index" />
        </template>

        <!-- 操作区插槽 (支持作用域插槽透传 group 数据) -->
        <template v-if="group.extra || $slots.extra" #extra>
          <template v-if="group.extra">
            {{ group.extra }}
          </template>
          <slot v-else name="extra" :group="group" :index="index" />
        </template>

        <el-descriptions-item v-for="item in group.rows" :key="item.label" v-bind="item">
          <template #label>
            <component
              :is="
                h(
                  Comp,
                  {
                    modelValue: descriptionsData,
                    ...item.label
                  },
                  $slots
                )
              "
            />
          </template>

          <template #default>
            <component
              :is="
                h(
                  Comp,
                  {
                    modelValue: descriptionsData,
                    ...item.value
                  },
                  $slots
                )
              "
            />
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </div>
</template>
