<template>
  <div>
    <MA type="primary">新增</MA>
    <MA>编辑</MA>
    <MA type="danger">删除</MA>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/a/README.md?raw'
</script>

<style lang="scss" scoped></style>
