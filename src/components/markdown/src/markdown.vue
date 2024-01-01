<template>
  <div class="m-markdown">
    <div :id="vditorId" />
  </div>
</template>

<script setup lang="ts">
//TODO https://b3log.org/vditor/
import 'vditor/dist/index.css'
import Vditor from 'vditor'
import { toolbar } from './vditor/vditor'

import { markdownProps, markdownEmits } from './markdown'
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { uniqueId, setBaseUrlFile, removeBaseUrlFile } from '@/utils'
import { useVditorTheme, useVditorUpload, useVditorCDN } from './hooks'

defineOptions({
  name: 'MMarkDown'
})

const props = defineProps(markdownProps)
const emit = defineEmits(markdownEmits)

const vditorId = uniqueId('vditor-')
let vditor: Nullable<Vditor> = null

// v-model
let vditorContent = ''
const setVditorContent = (content: string) => {
  vditor?.setValue(setBaseUrlFile(content))
}

watch(
  () => props.modelValue,
  (val) => {
    if (val === vditorContent) return
    setVditorContent(val)
  }
)

// 主题
const { vditorTheme, setVditorTheme } = useVditorTheme()
watch(vditorTheme.theme, () => {
  setVditorTheme(vditor)
})

// 上传图片
const { vditorUploadOptions } = useVditorUpload(props, (val) => {
  vditor?.insertValue(val)
})

let _toolbar = toolbar
if (!props.upload) {
  _toolbar = toolbar.filter((item) => item !== 'upload')
}

const vditorCDN = useVditorCDN()
const init = () => {
  vditor = new Vditor(vditorId, {
    cdn: vditorCDN.cdn,
    // 设置外观主题
    theme: vditorTheme.theme.value,
    lang: 'zh_CN',
    mode: 'ir',
    toolbar: _toolbar,
    preview: {
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
      actions: []
    },
    hint: {
      emojiPath: vditorCDN.emojiPath
    },
    cache: {
      enable: false
    },
    ...props.options,
    ...vditorUploadOptions,
    input: (v) => {
      vditorContent = removeBaseUrlFile(v)
      emit('update:modelValue', vditorContent)
      emit('change', vditorContent)
    },
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      setVditorContent(props.modelValue)
      emit('getVditor', vditor!)
    }
  })
}

const destroy = () => {
  if (!vditor) return
  vditor.destroy()
  vditor = null
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  destroy()
})
</script>

<style lang="scss" scoped>
.m-markdown {
  margin-top: 20px;
  width: 100%;
}
</style>
