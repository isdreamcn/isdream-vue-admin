<template>
  <div>
    <MMarkdown v-model="content"></MMarkdown>
    <MMarkdownView :value="content"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import readme from '@/components/markdown/README.md?raw'

const content = ref(readme)
</script>

<style lang="scss" scoped></style>
