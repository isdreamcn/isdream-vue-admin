<template>
  <el-icon
    class="m-icon"
    :size="props.size"
    :color="props.color"
    :class="{ iconfont: isIconfont, [iconfontClass]: isIconfont }"
  >
    <slot>
      <!-- element plus icons -->
      <component v-if="!isIconfont" :is="props.name"></component>
    </slot>
  </el-icon>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { iconProps } from './icon'

defineOptions({
  name: 'MIcon'
})

const props = defineProps(iconProps)
const slots = useSlots()

// 使用iconfont
const isIconfont = computed(
  () => !slots.default && /^(i|I)confont/.test(props.name)
)

const iconfontClass = computed(() => {
  let classname = props.name.toLowerCase()
  return classname.replace(/^(i|I)confont-?/, 'icon-')
})
</script>

<style lang="scss" scoped>
.m-icon {
}
</style>
