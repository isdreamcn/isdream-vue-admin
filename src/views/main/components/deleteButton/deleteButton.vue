<template>
  <div>
    <p>批量删除按钮</p>
    <MDeleteButton
      :http="deleteHttp"
      :selectKeys="selectKeys"
      @click="reload"
      @reload="reload"
    ></MDeleteButton>

    <MDeleteButton style="margin-left: 20px">
      <MA>没有选中</MA>
    </MDeleteButton>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/deleteButton/README.md?raw'

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
