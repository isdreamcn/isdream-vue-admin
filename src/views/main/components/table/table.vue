<template>
  <div>
    <div>isReload: {{ isReload }}</div>
    <div>selectKeys: {{ selectKeys }}</div>
    <MTable
      :columns="tableColumns"
      :data="userList"
      :http="getDemoUserList"
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
        <el-button v-auth="searchBtnPermission" @click="isReload = true"
          >重置</el-button
        >
        <el-button v-auth:tableSearch @click="params.q = 456"
          >params.q = 456</el-button
        >
      </template>
      <template #actions="{ row, index, value }">
        <el-button size="small" @click="viewDetails({ row, index, value })"
          >详情</el-button
        >
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { tableColumns } from './config'
import { getDemoUserList } from '@/api/demo/user'

defineOptions({
  name: 'DemoCpnsMTable'
})

const isReload = ref(true)
const searchBtnPermission = ref('tableReset')

const userList = ref<any[]>()

// selectKeys
const selectKeys = ref<any[]>([1, 3, 5])

const viewDetails = (scope: any) => {
  console.log(scope)
}

// params
const params = reactive({
  q: 123
})
</script>

<style lang="scss" scoped></style>
