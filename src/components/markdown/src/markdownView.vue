<template>
  <div class="m-markdown-view" ref="vditorViewRef">MMarkdownView</div>
</template>

<script setup lang="ts">
import { markdownViewProps } from './markdownView'
import Vditor from 'vditor'
import { ref, watch, onMounted } from 'vue'
import { useVditorTheme } from './hooks'

defineOptions({
  name: 'MMarkdownView'
})

const props = defineProps(markdownViewProps)

const vditorViewRef = ref<HTMLDivElement>()

const { vditorTheme } = useVditorTheme()

const init = () => {
  if (!vditorViewRef.value) {
    return
  }
  Vditor.preview(vditorViewRef.value, props.value, {
    mode: vditorTheme.content.value,
    theme: {
      // 设置内容主题
      current: vditorTheme.content.value
    },
    hljs: {
      // 设置代码块主题
      style: vditorTheme.code.value
    }
  })
}

onMounted(() => {
  init()
})

watch(
  [
    () => props.value,
    () => vditorTheme.theme.value,
    () => vditorTheme.content.value,
    () => vditorTheme.code.value
  ],
  init
)
</script>

<style lang="scss" scoped>
.m-markdown-view {
}
</style>
