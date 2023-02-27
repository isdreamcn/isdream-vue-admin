<template>
  <div>
    <div style="margin-bottom: 20px">
      {{ formDialog }}
    </div>
    <el-button type="primary" @click="show(0)">新增</el-button>
    <el-button type="primary" @click="show(1)">编辑</el-button>
    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="fields"
      :httpAdd="demoUserAdd"
      :httpEdit="demoUserEdit"
      :httpGet="demoUserDetails"
      @reload="reload"
    ></MFormDialog>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fields } from './config'
import { demoUserAdd, demoUserEdit, demoUserDetails } from '@/api/demo/user'
import readme from '@/components/formDialog/README.md?raw'

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

const reload = () => {
  console.log('reload')
}
</script>

<style lang="scss" scoped></style>
