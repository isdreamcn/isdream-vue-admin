<template>
  <div class="main-box">
    <p>Main</p>
    <p>$checkAuth('test') => {{ $checkAuth('test') }}</p>
    <p>$getVal({{ obj }}, 'a.b[0]') => {{ $getVal(obj, 'a.b[0]') }}</p>
    <el-input v-model="input" placeholder="缓存" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')

const obj = {
  a: {
    b: [1]
  }
}
</script>

<style scoped lang="scss"></style>
