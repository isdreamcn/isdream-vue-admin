<template>
  <div>
    <MForm :fields="fields" @submit="search" @cancel="search"> </MForm>
    <MTable
      :columns="columns"
      :http="getTestList"
      :params="params"
      v-model:isReload="isReload"
      v-model:selectKeys="selectKeys"
    >
      <template #extra>
        <el-button type="primary" @click="edit(0)">新增</el-button>
        <MDeleteButton
          :selectKeys="selectKeys"
          @click="del(selectKeys)"
        ></MDeleteButton>
      </template>

      <template #createAt="{ value }">
        <span v-dateFormat:YYYY-MM-DD="value"></span>
      </template>

      <template #actions="{ row }">
        <MA type="primary" @click="edit(row.id)">编辑</MA>
        <MA type="danger" @click="del([row.id])">删除</MA>
      </template>
    </MTable>

    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="dialogFields"
      :httpAdd="testAdd"
      :httpEdit="testEdit"
      :httpGet="testDetails"
      @reload="reload"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { columns, fields, dialogFields } from './config'
import {
  getTestList,
  testAdd,
  testDel,
  testEdit,
  testDetails
} from '@/api/test'

// 搜索
const params = ref<any>({})
const search = (data: any) => {
  params.value = {
    ...params.value,
    ...data
  }
}

// 新增/编辑
const formDialog = reactive({
  visible: false,
  id: 0
})
const edit = (id: number) => {
  formDialog.id = id
  formDialog.visible = true
}

// 重载
const isReload = ref(true)
const reload = () => {
  isReload.value = true
}

const selectKeys = ref<number[]>([])
// 删除
const del = (ids: number[]) => {
  testDel(ids).then(() => {
    ElMessage.success('删除成功')
    reload()
  })
}
</script>

<style lang="scss" scoped></style>
