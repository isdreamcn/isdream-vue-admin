<template>
  <component :is="layoutComponents">
    <component :is="createBasicLayout('/')"></component>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { getLayout, layoutOptions } from './config'
import { createBasicLayout } from './index'

const appStore = useAppStore()

if (!getLayout(appStore.appSetting.layout)) {
  appStore.setAppSetting({ layout: layoutOptions[0]?.value })
}

const layoutComponents = computed(
  () => getLayout(appStore.appSetting.layout)?.component || 'div'
)
</script>

<style lang="scss" scoped></style>
