<template>
  <div>
    <MUpload
      list-type="picture-card"
      accept=".png,.jpg,.jpge"
      v-model="fileList"
    ></MUpload>
    <pre>{{ fileList }}</pre>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/upload/README.md?raw'
import type { UploadFile } from '@/components'
import { ref } from 'vue'

const fileList = ref<UploadFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
])
</script>

<style lang="scss" scoped></style>
