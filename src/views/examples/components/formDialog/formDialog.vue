<template>
  <div>
    <div style="margin-bottom: 20px">
      {{ formDialog }}
    </div>
    <el-button type="primary" @click="show(0)">新增</el-button>
    <el-button type="primary" @click="show(1)">编辑</el-button>
    <el-button type="primary" @click="show(1, true)">查看</el-button>
    <MFormDialog
      v-model="formDialog.visible"
      v-bind="formDialog"
      :fields="fields"
      :httpAdd="demoUserAdd"
      :httpEdit="demoUserEdit"
      :httpGet="demoUserDetails"
      @reload="reload"
    >
    </MFormDialog>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fields } from './config'
import { demoUserAdd, demoUserEdit, demoUserDetails } from '@/api/examples/user'
import readme from '@/components/formDialog/README.md?raw'

const formDialog = reactive({
  visible: false,
  disabled: false,
  id: 0,
  value: {
    name: 'default'
  }
})

const show = (id: number, disabled = false) => {
  formDialog.id = id
  formDialog.disabled = disabled
  formDialog.visible = true
}

const reload = () => {
  console.log('reload')
}
</script>

<style lang="scss" scoped></style>
