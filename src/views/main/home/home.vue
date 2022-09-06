<template>
  <div>
    Main
    <el-button @click="update">123</el-button>

    <div class="test">
      <div class="test-item">test-item</div>
    </div>
    <MDemo type="a"></MDemo>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import config from '@/config'
defineOptions({
  name: config.mainName
})

const update = () => {
  ElMessage('this is a message.')
}
</script>

<style scoped lang="scss"></style>
