<template>
  <div class="error-404">
    <div class="lottie-box">
      <MLottie :data="data404"></MLottie>
    </div>
    <div class="actions">
      <div>{{ tip }}</div>
      <el-space>
        <el-link type="primary" class="actions-item" @click="goBack"
          >返回上一页</el-link
        >
        <el-link type="primary" class="actions-item" @click="goHome"
          >返回首页</el-link
        >
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { randomNum } from '@/utils'
import { appConfig } from '@/config'
import data404 from '@/assets/lottie/not-found-404.json'

const tips = [
  '我们怎么到这来了？',
  '看起来我们进入了错误的链接',
  '这是一个 404 页面',
  '这里什么都没有'
]

const tip = ref(tips[randomNum(0, tips.length - 1)])

const router = useRouter()
const goHome = () => {
  router.push({
    name: appConfig.routeMainName
  })
}

const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.error-404 {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-60px);
  .lottie-box {
    width: 550px;
    height: auto;
  }
  .actions {
    font-size: 18px;
    color: #999999;
    .actions-item {
      margin-top: 20px;
      font-size: 20px;
    }
  }
}

@media (max-width: 768px) {
  .error-404 {
    flex-direction: column;
    .lottie-box {
      width: 70%;
    }
    .actions {
      text-align: center;
    }
  }
}
</style>
