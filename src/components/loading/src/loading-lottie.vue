<template>
  <MLoading :loading="props.loading">
    <MLottie
      :data="loadingData"
      style="width: 25%; min-width: 350px"
      v-bind="$attrs"
    ></MLottie>
  </MLoading>
</template>

<script setup lang="ts">
import MLoading from './loading.vue'
import MLottie from '@/components/lottie'

import { loadingLottieProps } from './loading-lottie'
import loadingData from '@/assets/lottie/loading.json'

defineOptions({
  name: 'MLoadingLottie',
  inheritAttrs: false
})

const props = defineProps(loadingLottieProps)
</script>

<style lang="scss" scoped></style>
