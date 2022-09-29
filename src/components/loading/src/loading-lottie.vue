<template>
  <MLoading :loading="props.loading">
    <MLottie :data="loadingData" style="width: 25%"></MLottie>
  </MLoading>
</template>

<script setup lang="ts">
import { loadingLottieProps } from './loading-lottie'
import loadingData from '@/assets/lottie/loading.json'

defineOptions({
  name: 'MLoadingLottie'
})

const props = defineProps(loadingLottieProps)
</script>

<style lang="scss" scoped></style>
