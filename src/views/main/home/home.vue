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
import { demo } from '@/api/main/demo'
defineOptions({
  name: config.mainName
})

const update = () => {
  ElMessage('this is a message.')
}

demo()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
</script>

<style scoped lang="scss"></style>
