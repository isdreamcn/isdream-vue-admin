<template>
  <div>
    <MLottie
      class="lottie-box"
      :data="data404"
      width="400px"
      height="400px"
    ></MLottie>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import data404 from '@/assets/lottie/not-found-404.json'
import readme from '@/components/lottie/README.md?raw'

defineOptions({
  name: 'DemoCpnsLottie'
})
</script>

<style lang="scss" scoped></style>
