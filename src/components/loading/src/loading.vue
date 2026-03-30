<template>
  <transition appear leave-active-class="animate__animated animate__zoomOut">
    <div
      v-show="props.loading"
      ref="loadingRef"
      class="m-loading"
      :style="{
        'z-index': zIndex
      }"
    >
      <slot>Loading~</slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { loadingProps } from './loading'

defineOptions({
  name: 'MLoading'
})

const props = defineProps(loadingProps)

const loadingRef = ref<Element>()
let originalPosition = ''

onMounted(() => {
  const parentElement = loadingRef.value?.parentElement
  if (parentElement) {
    originalPosition = parentElement.style.position
    parentElement.style.position = 'relative'
  }
})

onBeforeUnmount(() => {
  const parentElement = loadingRef.value?.parentElement
  if (parentElement) {
    parentElement.style.position = originalPosition
  }
})
</script>

<style lang="scss" scoped>
.m-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--el-bg-color);
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
}
</style>
