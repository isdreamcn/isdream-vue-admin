<template>
  <div>
    <p>批量删除按钮</p>
    <MDeleteButton
      :http="demoUserDel"
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
import { demoUserDel } from '@/api/demo/user'

defineOptions({
  name: 'DemoCpnsDeleteButton'
})

const selectKeys = [1, 2, 3, 4, 5]

const reload = () => {
  console.log('reload')
}
</script>

<style lang="scss" scoped></style>
