<template>
  <div>
    <ElButton @click="setLoading">
      {{ loading ? '取消' : '开启' }}loading</ElButton
    >
    <div class="loading-box">
      123456
      <MLoading :loading="loading"></MLoading>
    </div>
    <div class="loading-box">
      123456
      <MLoadingLottie :loading="loading" style="width: 50%"></MLoadingLottie>
    </div>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/loading/README.md?raw'
import { ref } from 'vue'

const loading = ref(true)
const setLoading = () => {
  loading.value = !loading.value
}
</script>

<style lang="scss" scoped>
.loading-box {
  display: inline-block;
  margin-left: 20px;
  width: 400px;
  height: 400px;
}
</style>
