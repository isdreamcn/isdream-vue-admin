<template>
  <div class="m-lottie" :style="style" ref="lottieContainerRef"></div>
</template>

<script setup lang="ts">
import lottie from 'lottie-web'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { lottieProps, lottieEmits } from './lottie'

import { AnimationItem } from 'lottie-web'

defineOptions({
  name: 'MLottie'
})

const props = defineProps(lottieProps)
const emit = defineEmits(lottieEmits)

// 样式
const style = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

const lottieContainerRef = ref<Element>()

let anim: AnimationItem | null = null
onMounted(() => {
  anim = lottie.loadAnimation({
    renderer: 'svg',
    loop: true,
    autoplay: true,
    ...props.config,
    animationData: props.data,
    container: lottieContainerRef.value!
  })
  emit('created', anim)
})

const destroy = () => {
  anim && anim.destroy()
}

onBeforeUnmount(() => {
  destroy()
})

defineExpose({
  anim,
  destroy
})
</script>

<style scoped lang="scss">
.m-lottie {
}
</style>
