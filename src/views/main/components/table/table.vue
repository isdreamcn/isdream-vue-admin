<template>
  <div>
    <div>isReload: {{ isReload }}</div>
    <div>selectKeys: {{ selectKeys }}</div>
    <MTable
      :columns="tableColumns"
      :data="userList"
      :http="getDemoUserList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button v-auth="searchBtnPermission" @click="isReload = true"
          >重置</el-button
        >
        <el-button v-auth:tableSearch @click="params.q = 456"
          >params.q = 456</el-button
        >
        <el-button @click="setSelectKeys">选中id 1~10</el-button>
      </template>

      <template #createAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>
      <template #actions="{ row, index, value }">
        <el-button size="small" @click="viewDetails({ row, index, value })"
          >详情</el-button
        >
      </template>
    </MTable>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/table/README.md?raw'

import { ref, reactive } from 'vue'
import { tableColumns } from './config'
import { getDemoUserList } from '@/api/demo/user'

defineOptions({
  name: 'DemoCpnsMTable'
})

const isReload = ref(true)
const searchBtnPermission = ref('tableReset')

const userList = ref<any[]>(
  new Array(55).fill(0).map((_, index) => ({
    id: index + 1,
    name: index + 1
  }))
)

// selectKeys
const selectKeys = ref<any[]>([1, 3, 5])
const setSelectKeys = () => {
  selectKeys.value = new Array(10).fill(0).map((_, index) => index + 1)
}

// params
const params = reactive({
  q: 123
})

const viewDetails = (scope: any) => {
  console.log(scope)
}
</script>

<style lang="scss" scoped></style>
