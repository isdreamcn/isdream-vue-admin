<template>
  <div class="lottie-container" :style="style" ref="lottieContainerRef"></div>
</template>

<script setup lang="ts">
import lottie from 'lottie-web'
import { ref, onMounted, computed } from 'vue'
import { lottieProps, lottieEmits } from './lottie'

import { AnimationItem } from 'lottie-web'

defineOptions({
  name: 'MLottie'
})

const props = defineProps(lottieProps)
const emit = defineEmits(lottieEmits)

// 样式
const style = computed(() => {
  let _style = ''
  if (props.width) {
    _style += `width: ${props.width}px;`
  }
  if (props.height) {
    _style += `height: ${props.width}px;`
  }
  return _style
})

const lottieContainerRef = ref<Element>()

let anim: AnimationItem | null = null
onMounted(() => {
  anim = lottie.loadAnimation({
    container: lottieContainerRef.value!,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: props.data
  })
  emit('created', anim)
})

const destroy = (anim: AnimationItem) => {
  anim && anim.destroy()
}

defineExpose({
  anim,
  destroy
})
</script>

<style scoped lang="scss">
.lottie-container {
  width: 100%;
  height: 100%;
}
</style>
