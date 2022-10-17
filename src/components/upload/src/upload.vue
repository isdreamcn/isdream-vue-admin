<template>
  <div class="m-upload">
    MUpload
    <el-upload v-bind="$attrs"></el-upload>
  </div>
</template>

<script setup lang="ts">
import { uploadProps, uploadEmits } from './upload'

defineOptions({
  name: 'MUpload',
  inheritAttrs: false
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)
</script>

<style lang="scss" scoped>
.m-upload {
}
</style>
