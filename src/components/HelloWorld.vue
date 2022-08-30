<!--
 * @Description:
 * @Author: mtm
 * @Date: 2022-08-29 22:40:35
 * @LastEditTime: 2022-08-30 18:35:12
 * @LastEditors: mtm
-->
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
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
