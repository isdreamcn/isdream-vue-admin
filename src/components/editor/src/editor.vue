<template>
  <div class="m-editor">
    <textarea ref="elRef" :id="tinymceId" :key="tinymceId"></textarea>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from 'tinymce'
import { editorProps, editorEmits } from './editor'
import tinymce from 'tinymce/tinymce'
import {
  ref,
  watch,
  useAttrs,
  onMounted,
  onActivated,
  onDeactivated,
  onBeforeUnmount
} from 'vue'
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

// refs
const editorRef = ref<Editor>()
const elRef = ref<HTMLElement>()

const { options: imgUploadOptions } = useTinymceImgUpload(props)
const { tinymceOptions, tinymceId } = useTinymceOptions(
  props,
  {
    ...imgUploadOptions
  },
  (editor) => {
    editorRef.value = editor
    editor.on('init', (e) => initSetup(e))
    emit('inited', editor)
  }
)

let inited = false
const initEditor = () => {
  if (inited) {
    return
  }
  inited = true
  if (elRef.value) {
    elRef.value.style.visibility = 'hidden'
  }
  tinymce.init(tinymceOptions.value).catch((err) => {
    emit('init-error', err)
  })
}

const destory = () => {
  if (!inited) {
    return
  }
  inited = false
  tinymce.remove(tinymceOptions.value.selector!)
}

onMounted(() => {
  initEditor()
})

onActivated(() => {
  initEditor()
})

onBeforeUnmount(() => {
  destory()
})

// tinymce init 之后会创建一个动态iframe 而keep-alive回来之后iframe是空的
// TODO: https://github.com/PanJiaChen/vue-element-admin/issues/141
onDeactivated(() => {
  destory()
})

function initSetup(e: Record<string, any>) {
  const editor = editorRef.value
  if (!editor) {
    return
  }

  // disabled
  watch(
    () => props.disabled,
    () => {
      editor.setMode(props.disabled ? 'readonly' : 'design')
    },
    {
      immediate: true
    }
  )

  bindModelValueHandler(editor)
  bindHandlers(e, attrs, editor)
}

function bindModelValueHandler(editor: Editor) {
  const editorBody = editor.getBody()
  let content = ''

  watch(
    () => props.modelValue,
    (val) => {
      if (val === content) {
        return
      }
      editor.setContent(setBaseUrlFile(val))
      // 光标移到最后
      editor.selection.select(editorBody, true)
      editor.selection.collapse(false)
    },
    {
      immediate: true
    }
  )

  editor.on('change keyup undo redo', () => {
    content = removeBaseUrlFile(editor.getContent())
    emit('update:modelValue', content)
    emit('change', content)
  })
}
</script>

<style lang="scss" scoped>
.m-editor {
  width: 100%;
}
</style>
