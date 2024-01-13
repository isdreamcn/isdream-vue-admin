<template>
  <div>
    <p>{{ content }}</p>
    <div class="btns">
      <ElButton @click="setContent" type="primary">修改content</ElButton>
    </div>
    <MEditor v-model="content" @mouseDown="mouseDown"></MEditor>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/editor/README.md?raw'
import { ref } from 'vue'

const content = ref('123')
const setContent = () => {
  content.value += 'abc'
}

const mouseDown = () => {
  console.log('mouseDown')
}
</script>

<style lang="scss" scoped>
.btns {
  margin-bottom: 20px;
}
</style>
