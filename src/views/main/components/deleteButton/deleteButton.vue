<template>
  <div>
    <p>批量删除按钮</p>
    <MDeleteButton
      :http="deleteHttp"
      :http-key="false"
      :selectKeys="selectKeys"
      @click="reload"
      @reload="reload"
    ></MDeleteButton>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DemoCpnsDeleteButton'
})

const selectKeys = [1, 2, 3, 4, 5]

const deleteHttp = (id: number | string) => {
  console.log('删除', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 2000)
  })
}

const reload = () => {
  console.log('reload')
}
</script>

<style lang="scss" scoped></style>
