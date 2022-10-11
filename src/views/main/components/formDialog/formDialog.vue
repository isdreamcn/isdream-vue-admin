<template>
  <div>
    <el-button type="primary" @click="show(0)">新增</el-button>
    <el-button type="primary" @click="show(1)">编辑</el-button>
    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="fields"
      :httpAdd="httpAdd"
      :httpEdit="httpEdit"
      :httpGet="httpGet"
    ></MFormDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { fields } from './config'

defineOptions({
  name: 'DemoCpnsMFormDialog'
})

const formDialog = reactive({
  visible: false,
  id: 0,
  value: {
    name: 'default'
  }
})

const show = (id: number) => {
  formDialog.id = id
  formDialog.visible = true
}

const httpAdd = () =>
  new Promise((resovle) => {
    setTimeout(() => {
      resovle({})
    }, 3000)
  })

const httpGet = () =>
  new Promise<any>((resovle) => {
    setTimeout(() => {
      resovle({ name: 'httpGet' })
    })
  })

const httpEdit = () =>
  new Promise((resovle) => {
    setTimeout(() => {
      resovle({})
    }, 1000)
  })
</script>

<style lang="scss" scoped></style>
