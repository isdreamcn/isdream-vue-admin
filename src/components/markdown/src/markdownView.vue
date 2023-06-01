<template>
  <div class="m-markdown-view" ref="vditorViewRef">加载中...</div>
</template>

<script setup lang="ts">
import 'vditor/dist/index.css'
import Vditor from 'vditor'

import { markdownViewProps } from './markdownView'
import { ref, watch, onMounted } from 'vue'
import { useVditorTheme } from './hooks'
import { setBaseUrlFile } from '@/utils'

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
  Vditor.preview(vditorViewRef.value, setBaseUrlFile(props.value), {
    mode: vditorTheme.content.value,
    theme: {
      // 设置内容主题
      current: vditorTheme.content.value
    },
    hljs: {
      // 设置代码块主题
      style: vditorTheme.code.value,
      lineNumber: true
    },
    ...props.options
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
