<template>
  <div>
    <p>切换路由后的200ms内发送了api请求，就会显示动画</p>
    <p>发送的api请求全部结束，关闭动画</p>
  </div>
</template>

<script setup lang="ts">
import { getDemoUserList } from '@/api/examples/user'
import { demoErrorNotFound } from '@/api/examples/error'

getDemoUserList().then((res) => {
  console.log(res, 'getDemoUserList')
})

demoErrorNotFound()
  .then((res) => {
    console.log(res, 'demoErrorNotFound')
  })
  .catch((err) => {
    console.log(err, 'demoErrorNotFound err')
  })
</script>

<style lang="scss" scoped></style>
