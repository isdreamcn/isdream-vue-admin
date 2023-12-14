<template>
  <div class="m-markdown-view" ref="vditorViewRef">加载中...</div>
</template>

<script setup lang="ts">
import 'vditor/dist/index.css'
import Vditor from 'vditor'

import { markdownViewProps } from './markdownView'
import { ref, watch, onMounted } from 'vue'
import { useVditorTheme, useVditorCDN } from './hooks'
import { setBaseUrlFile } from '@/utils'

defineOptions({
  name: 'MMarkdownView'
})

const props = defineProps(markdownViewProps)

const vditorViewRef = ref<HTMLDivElement>()

const { vditorTheme } = useVditorTheme()
const vditorCDN = useVditorCDN()
const init = () => {
  if (!vditorViewRef.value) {
    return
  }
  Vditor.preview(vditorViewRef.value, setBaseUrlFile(props.value), {
    cdn: vditorCDN.cdn,
    emojiPath: vditorCDN.emojiPath,
    mode: vditorTheme.content.value,
    theme: {
      // 设置内容主题
      current: vditorTheme.content.value,
      path: vditorCDN.themePath
    },
    hljs: {
      // 设置代码块主题
      style: vditorTheme.code.value,
      lineNumber: true
    },
    transform: (html: string) => {
      // 渲染出来的 href 链接在新窗口打开
      return html.replaceAll(
        /<a href="(https?:\/\/.*)>(.*)<\/a>/gi,
        '<a target="_blank" href="$1>$2</a>'
      )
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
