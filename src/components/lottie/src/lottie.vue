<template>
  <div ref="lottieContainerRef" class="m-lottie" :style="style"></div>
</template>

<script setup lang="ts">
import type { AnimationItem } from 'lottie-web'
import lottie from 'lottie-web/build/player/lottie_light'
import { ref, shallowRef, onMounted, onBeforeUnmount, computed } from 'vue'
import { lottieProps, lottieEmits } from './lottie'

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

// 使用 shallowRef 以便 defineExpose 能暴露最新实例（普通 let 变量只会暴露初始 null）
const anim = shallowRef<Nullable<AnimationItem>>(null)
onMounted(() => {
  anim.value = lottie.loadAnimation({
    renderer: 'svg',
    loop: true,
    autoplay: true,
    ...props.config,
    animationData: props.data,
    container: lottieContainerRef.value!
  })
  emit('created', anim.value)
})

const destroy = () => {
  anim.value?.destroy()
  anim.value = null
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
