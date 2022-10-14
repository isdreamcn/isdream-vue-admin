<template>
  <div>
    <p>{{ content }}</p>
    <MEditor
      v-model="content"
      :upload="upload"
      @mouseDown="mouseDown"
    ></MEditor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMEditor'
})

const content = ref('123')

const mouseDown = () => {
  console.log('mouseDown')
}

const upload = (formData: FormData) => {
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
