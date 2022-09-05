<template>
  <div class="error-404">
    <MLottie class="lottie-box" :data="data404"></MLottie>
    <div class="actions">
      <div>{{ tip }}</div>
      <el-link type="primary" class="goBack" href="/">返回首页</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import data404 from '@/assets/lottie/not-found-404.json'
import { randomNum } from '@/utils'

defineOptions({
  name: 'Error404'
})

const tips = [
  '我们怎么到这来了？',
  '看起来我们进入了错误的链接',
  '这是一个 404 页面',
  '这里什么都没有'
]

const tip = ref(tips[randomNum(0, tips.length - 1)])
</script>

<style scoped lang="scss">
.error-404 {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-60px);
  .lottie-box {
    width: 600px;
    height: 600px;
  }
  .actions {
    font-size: 18px;
    color: #999999;
    .goBack {
      margin-top: 20px;
      font-size: 20px;
    }
  }
}
</style>
