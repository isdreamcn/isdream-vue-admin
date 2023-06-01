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
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { uniqueId, setBaseUrlFile, removeBaseUrlFile } from '@/utils'
import { useVditorTheme, useVditorUpload } from './hooks'

defineOptions({
  name: 'MMarkDown'
})

const props = defineProps(markdownProps)
const emit = defineEmits(markdownEmits)

const vditorId = uniqueId('vditor-')
const vditor = ref<Vditor>()

// value
const vditorValue = ref('')
// v-model
const modelValueHandler = () => {
  let content = ''

  watch(
    () => vditorValue.value,
    (val) => {
      content = removeBaseUrlFile(val)
      emit('update:modelValue', content)
      emit('change', content)
    }
  )

  watch(
    () => props.modelValue,
    (val) => {
      if (val === content) {
        return
      }

      if (vditor.value) {
        vditor.value.setValue(setBaseUrlFile(val))
      }
    },
    {
      immediate: true
    }
  )
}

// 主题
const { vditorTheme } = useVditorTheme(vditor)
// 上传图片
const { vditorUploadOptions } = useVditorUpload(props, (val) => {
  if (vditor.value) {
    vditor.value.insertValue(val)
  } else {
    vditorValue.value += val
  }
})

let _toolbar = toolbar
if (!props.upload) {
  _toolbar = toolbar.filter((item) => item !== 'upload')
}

const init = () => {
  vditor.value = new Vditor(vditorId, {
    // 设置外观主题
    theme: vditorTheme.theme.value,
    lang: 'zh_CN',
    mode: 'ir',
    toolbar: _toolbar,
    preview: {
      theme: {
        // 设置内容主题
        current: vditorTheme.content.value
      },
      hljs: {
        // 设置代码块主题
        style: vditorTheme.code.value,
        lineNumber: true
      },
      actions: []
    },
    cache: {
      enable: false
    },
    ...props.options,
    ...vditorUploadOptions,
    input: (v) => {
      vditorValue.value = v
    },
    after: () => {
      // vditor.value is a instance of Vditor now and thus can be safely used here
      modelValueHandler()
      emit('getVditor', vditor.value!)
    }
  })
}

const destroy = () => {
  vditor.value && vditor.value.destroy()
  vditor.value = undefined
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
