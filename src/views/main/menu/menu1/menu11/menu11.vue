<template>
  <div>
    <p>Menu11</p>
    <el-input v-model="input" placeholder="深度缓存" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'Menu11'
})

const input = ref('')
</script>

<style lang="scss" scoped></style>
