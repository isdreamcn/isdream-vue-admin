<script setup lang="ts">
import { ElMessage } from 'element-plus'

const open = () => {
  ElMessage('this is a message.')
}
</script>

<template>
  <el-button @click="open">123</el-button>
  <div>
    <el-link type="danger">danger</el-link>
    <el-link type="info">info</el-link>
  </div>
  <el-date-picker type="date" placeholder="选择日期" />

  <div class="test">
    <div class="test-item">test-item</div>
  </div>
  <MDemo type="a"></MDemo>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
.test {
  .test-item {
    color: red;
  }
}
</style>
