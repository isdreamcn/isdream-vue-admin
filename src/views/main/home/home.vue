<template>
  <div class="main-box">
    <p>Main</p>
    <el-input v-model="input" placeholder="缓存" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import config from '@/config'

defineOptions({
  name: config.mainName
})

const input = ref('')
</script>

<style scoped lang="scss"></style>
