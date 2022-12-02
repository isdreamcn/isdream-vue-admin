<script setup lang="ts">
import { computed } from 'vue'
import { useRouterStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import { MLoadingLottie } from '@/components'
// 国际化
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// loading
const routerStore = useRouterStore()
const loading = computed(() => routerStore.loading)
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView></RouterView>
  </ElConfigProvider>
  <MLoadingLottie :loading="loading"></MLoadingLottie>
</template>

<style scoped></style>
