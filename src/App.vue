<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// 国际化
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <HelloWorld />
  </ElConfigProvider>
</template>

<style scoped></style>
