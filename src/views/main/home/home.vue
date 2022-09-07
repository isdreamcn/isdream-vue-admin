<template>
  <div>
    Main
    <el-button @click="update">123</el-button>

    <div class="test">
      <div class="test-item">test-item</div>
    </div>
    <MDemo type="a"></MDemo>

    <div>
      <h2>DB</h2>
      <el-button @click="dbSet">保存</el-button>
      <el-button @click="dbGet">获取</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import config from '@/config'
import { demo } from '@/api/main/demo'
import db from '@/storage'
defineOptions({
  name: config.mainName
})

const update = () => {
  ElMessage('this is a message.')
}

const dbSet = () => {
  db.set('name', { name: 456, age: 18 })
}

const dbGet = () => {
  const data = db.get('name')
  console.log(data)
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
