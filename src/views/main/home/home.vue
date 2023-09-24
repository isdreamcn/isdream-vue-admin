<template>
  <div class="main-box">
    <p>Main</p>
    <p>$checkAuth('test') => {{ $checkAuth('test') }}</p>
    <el-input v-model="input" placeholder="缓存" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Home'
})

const input = ref('')
</script>

<style scoped lang="scss"></style>
