<template>
  <div class="toggleDark-container" ref="switchRef" @click="beforeChange">
    <m-icon name="icon-sunny" v-show="!isDark"></m-icon>
    <m-icon name="icon-moon" v-show="isDark"></m-icon>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useDark } from '@/hooks'

const { isDark, toggleDark } = useDark()
const switchRef = ref<any>()

const beforeChange = () => {
  return new Promise<boolean>((resolve) => {
    const isAppearanceTransition =
      typeof (document as any).startViewTransition === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition) {
      resolve(true)
      return
    }

    const switchElement = switchRef.value
    const rect = switchElement.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = (document as any).startViewTransition(async () => {
      resolve(true)
      await nextTick()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      )
    })
  }).finally(() => {
    toggleDark()
  })
}
</script>

<style lang="scss" scoped>
.toggleDark-container {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
