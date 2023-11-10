<template>
  <div class="m-editor">
    <textarea :id="tinymceId" :key="tinymceId"></textarea>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from 'tinymce'
import { editorProps, editorEmits } from './editor'
import tinymce from 'tinymce/tinymce'
import { watch, useAttrs, onMounted, onActivated, onBeforeUnmount } from 'vue'
import { setBaseUrlFile, removeBaseUrlFile } from '@/utils'
import { bindHandlers } from './tinymce/helper'
import { useTinymceOptions, useTinymceImgUpload } from './hooks'
import './tinymce/resource'

defineOptions({
  name: 'MEditor'
})

const attrs = useAttrs()
const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)

let editor: Nullable<Editor> = null

const { options: imgUploadOptions } = useTinymceImgUpload(props)
const { tinymceOptions, tinymceId, skinName } = useTinymceOptions(
  props,
  {
    ...imgUploadOptions
  },
  (_editor) => {
    editor = _editor
    editor.on('init', (e) => initSetup(e))
    emit('inited', editor)
  }
)

const initEditor = () => {
  if (editor) return
  tinymce.init(tinymceOptions.value).catch((err) => {
    emit('init-error', err)
  })
}

const destory = () => {
  if (!editor) return
  tinymce.remove(tinymceOptions.value.selector!)
  editor = null
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  destory()
})

// tinymce init 之后会创建一个动态iframe 而keep-alive回来之后iframe是空的
onActivated(() => {
  destory()
  initEditor()
})

// disabled
watch(
  () => props.disabled,
  () => {
    setMode()
  }
)

// 模式切换 light dark
watch(skinName, () => {
  destory()
  initEditor()
})

// modelValue
let editorContent = ''
watch(
  () => props.modelValue,
  (val) => {
    if (val === editorContent) return
    setContent(val)
  }
)

function initSetup(e: Record<string, any>) {
  if (!editor) return

  setMode()
  setContent(props.modelValue)
  bindModelValueHandler(editor)
  bindHandlers(e, attrs, editor)
}

function bindModelValueHandler(editor: Editor) {
  editor.on('change keyup undo redo', () => {
    editorContent = removeBaseUrlFile(editor.getContent())
    emit('update:modelValue', editorContent)
    emit('change', editorContent)
  })
}

function setMode() {
  if (!editor) return
  editor.setMode(props.disabled ? 'readonly' : 'design')
}

function setContent(content: string) {
  if (!editor) return
  editor.setContent(setBaseUrlFile(content))
  // 光标移到最后
  const editorBody = editor.getBody()
  editor.selection.select(editorBody, true)
  editor.selection.collapse(false)
}
</script>

<style lang="scss" scoped>
.m-editor {
  width: 100%;
}
</style>
