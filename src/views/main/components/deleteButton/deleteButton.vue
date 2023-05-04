<template>
  <div>
    <p>批量删除按钮</p>
    <MDeleteButton
      :http="demoUserDel"
      :selectKeys="selectKeys"
      @click="reload"
      @reload="reload"
    ></MDeleteButton>

    <MDeleteButton> <MA>没有选中数据</MA> </MDeleteButton>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/deleteButton/README.md?raw'
import { demoUserDel } from '@/api/demo/user'

defineOptions({
  name: 'DemoCpnsDeleteButton'
})

const selectKeys = [1]

const reload = () => {
  console.log('reload')
}
</script>

<style lang="scss" scoped></style>
