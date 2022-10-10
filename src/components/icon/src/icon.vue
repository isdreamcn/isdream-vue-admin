<template>
  <div class="m-icon">
    <el-icon
      :size="props.size"
      :color="props.color"
      :class="{ iconfont: isIconfont, [iconfontClass]: isIconfont }"
    >
      <slot>
        <component v-if="!isIconfont" :is="props.name"></component>
      </slot>
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconProps } from './icon'

defineOptions({
  name: 'MIcon'
})

const props = defineProps(iconProps)

// 使用的iconfont
const isIconfont = computed(() => /^(i|I)confont/.test(props.name))

const iconfontClass = computed(() => {
  let classname = props.name.toLowerCase()
  return classname.replace(/^(i|I)confont-?/, 'icon-')
})
</script>

<style lang="scss" scoped>
.m-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
