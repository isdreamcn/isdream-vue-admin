<template>
  <div class="m-editor" :style="{ width: containerWidth }">
    <textarea ref="elRef" :id="tinymceId"></textarea>
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
import { bindHandlers, setValue } from './tinymce/helper'
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
const { tinymceOptions, tinymceId, containerWidth } = useTinymceOptions(
  props,
  {
    ...imgUploadOptions
  },
  (editor) => {
    editorRef.value = editor
    editor.on('init', (e) => initSetup(e))
  }
)

const initEditor = () => {
  const el = elRef.value
  if (el) {
    el.style.visibility = ''
  }
  tinymce
    .init(tinymceOptions.value)
    .then((editor) => {
      emit('inited', editor)
    })
    .catch((err) => {
      emit('init-error', err)
    })
}

const destory = () => {
  if (tinymce !== null) {
    tinymce?.remove?.(tinymceOptions.value.selector!)
  }
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

onDeactivated(() => {
  destory()
})

function initSetup(e: Record<string, any>) {
  const editor = editorRef.value
  if (!editor) {
    return
  }

  editor.setContent(props.modelValue)
  // 光标放在最后
  editor.selection.select(editor.getBody(), true)
  editor.selection.collapse(false)

  bindModelHandlers(editor)
  bindHandlers(e, attrs, editor)
}

function bindModelHandlers(editor: Editor) {
  watch(
    () => props.modelValue,
    (val: string, prevVal: string) => {
      setValue(editor, val, prevVal)
    }
  )

  editor.on('change keyup undo redo', () => {
    const content = editor.getContent()
    emit('update:modelValue', content)
    emit('change', content)
  })
}
</script>

<style lang="scss" scoped>
.m-editor {
}
</style>
