<script setup lang="ts">
// 国际化
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<style scoped></style>
