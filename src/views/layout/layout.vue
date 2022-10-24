<template>
  <component :is="layoutComponents">
    <component :is="createBasicLayout('/')"></component>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { getLayout } from './config'
import { createBasicLayout } from './index'

defineOptions({
  name: 'MLayout'
})

const appStore = useAppStore()
const layoutComponents = computed(
  () => getLayout(appStore.appSetting.layout).componnet
)
</script>

<style lang="scss" scoped></style>
