<template>
  <div>
    {{ content }}
    <MMarkdown v-model="content" :upload="upload"></MMarkdown>

    <p>Markdown View 组件</p>
    <MMarkdownView :value="content"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import type { MarkdownUpload } from '@/components'
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMMarkdown'
})

const content = ref('# 123')

const upload: MarkdownUpload = (formData: FormData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bold = formData.get('file')!
      if (typeof bold !== 'string') {
        resolve({
          data: {
            url: URL.createObjectURL(bold)
          }
        })
      }
    }, 300)
  })
}
</script>

<style lang="scss" scoped></style>
