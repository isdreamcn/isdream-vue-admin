<template>
  <component :is="layoutComponents">
    <component :is="createBasicLayout('/')"></component>
  </component>
  <MLoadingLottie :loading="loading"></MLoadingLottie>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, useRouterStore } from '@/store'
import { getLayout } from './config'
import { createBasicLayout } from './index'

defineOptions({
  name: 'MLayout'
})

// loading
const routerStore = useRouterStore()
const loading = computed(() => routerStore.loading)

const appStore = useAppStore()
const layoutComponents = computed(
  () => getLayout(appStore.appSetting.layout).componnet
)
</script>

<style lang="scss" scoped>
.m-layout {
  :deep(.m-layout__header) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px;
    @include m-menu-theme(true);

    .m-layout__header-tips {
      display: flex;
      align-items: center;
      .m-layout__header-tips-item {
        padding: 0 10px;
      }
    }

    .m-layout__header-actions {
      display: flex;
      height: 100%;
      .m-layout__header-actions-item {
        @include m-menu-theme-hover();
        padding: 0 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>
