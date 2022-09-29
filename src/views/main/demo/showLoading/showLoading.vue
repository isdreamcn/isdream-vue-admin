<template>
  <div>
    <p>切换路由后的200ms内发送了api请求，就会显示动画</p>
    <p>发送的api请求全部结束，关闭动画</p>
  </div>
</template>

<script setup lang="ts">
import { getDemoList1, getDemoList2 } from '@/api/demo'

defineOptions({
  name: 'DemoShowLoading'
})

getDemoList1().then((res) => {
  console.log(res, 'getDemoList1')
})

getDemoList2()
  .then((res) => {
    console.log(res, 'getDemoList2')
  })
  .catch((err) => {
    console.log(err, 'getDemoList2 err')
  })
</script>

<style lang="scss" scoped></style>
