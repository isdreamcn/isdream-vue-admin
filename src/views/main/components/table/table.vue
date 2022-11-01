<template>
  <div>
    <div>isReload: {{ isReload }}</div>
    <div>selectKeys: {{ selectKeys }}</div>
    <MTable
      :columns="tableColumns"
      :data="userList"
      :http="getUserList"
      :params="params"
      a="456"
      b="789"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #createAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>
      <template #extra>
        <el-button @click="isReload = true">重置</el-button>
        <el-button @click="params.q = 456">params.q = 456</el-button>
      </template>
      <template #actions="{ row, index, value }">
        <el-button size="small" @click="clg({ row, index, value })"
          >详情</el-button
        >
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { tableColumns } from './config'
import { getUserList } from '@/api/main/user'

defineOptions({
  name: 'DemoCpnsMTable'
})

const isReload = ref(true)

const userList = ref<any[]>()

// getUserList({
//   page: 1,
//   pageSize: 20
// }).then((res) => {
//   userList.value = res.data
// })

// selectKeys
const selectKeys = ref<any[]>([1, 3, 5])

const clg = (scope: any) => {
  console.log(scope)
}

// params
const params = reactive({
  q: 123
})
</script>

<style lang="scss" scoped></style>
