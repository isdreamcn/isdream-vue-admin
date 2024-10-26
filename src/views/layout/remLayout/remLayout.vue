<template>
  <div class="rem-layout" ref="elRef">
    <div style="font-size: 0.5rem">rem布局</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRemLayout } from '@/hooks'

const elRef = ref()

const { start, cancel } = useRemLayout()

onMounted(() => {
  start(elRef.value)
})

onUnmounted(() => {
  cancel()
})
</script>

<style lang="scss" scoped>
.rem-layout {
  height: 100%;
}
</style>
