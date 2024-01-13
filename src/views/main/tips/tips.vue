<template>
  <MMarkdownView :value="readme"></MMarkdownView>
</template>

<script setup lang="ts">
import readme from './README.md?raw'
</script>

<style lang="scss" scoped></style>
