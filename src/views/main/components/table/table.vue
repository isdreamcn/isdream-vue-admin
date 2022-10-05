<template>
  <div>
    <MTable :columns="tableColumns"></MTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { tableColumns } from './config'
import { getUserList } from '@/api/main/user'

defineOptions({
  name: 'DemoCpnsMtable'
})

const userList = ref()
getUserList({
  page: 1,
  pageSize: 20
}).then((res) => {
  console.log(res)
  userList.value = res
})
</script>

<style lang="scss" scoped></style>
