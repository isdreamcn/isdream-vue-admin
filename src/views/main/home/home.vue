<template>
  <div class="main-box">
    Main
    <el-button type="primary" @click="update">123</el-button>

    <div class="test">
      <div class="test-item">test-item</div>
    </div>
    <MDemo type="a"></MDemo>

    <div>
      <h2>DB</h2>
      <el-button @click="dbSet">保存</el-button>
      <el-button @click="dbGet">获取</el-button>
    </div>

    <el-button @click="toggleDark">toggleDark: {{ isDark }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import config from '@/config'
import db from '@/storage'

import { useDark } from '@/hooks'

defineOptions({
  name: config.mainName
})

const { isDark, toggleDark } = useDark()

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
</script>

<style scoped lang="scss">
.main-box {
  color: var(--el-color-primary);
}
</style>
