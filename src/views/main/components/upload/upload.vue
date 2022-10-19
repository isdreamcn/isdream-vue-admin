<template>
  <div style="max-width: 600px">
    <p>{{ fileList }}</p>
    <MUpload
      list-type="picture-card"
      v-model="fileList"
      :http="upload"
    ></MUpload>
  </div>
</template>

<script setup lang="ts">
import type { UploadUserFile, UploadHttp } from '@/components'
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMUpload'
})

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  }
  // {
  //   name: 'plant-1.png',
  //   url: '/images/plant-1.png'
  // }
])

const upload: UploadHttp = (formData: FormData) => {
  return new Promise((resolve /* , reject */) => {
    setTimeout(() => {
      const bold = formData.get('file')!
      if (typeof bold !== 'string') {
        resolve({
          data: {
            url: URL.createObjectURL(bold),
            name: bold.name
          }
        })
      }
    }, 2000)
    // setTimeout(() => {
    //   reject('err')
    // }, 1000)
  })
}
</script>

<style lang="scss" scoped></style>
