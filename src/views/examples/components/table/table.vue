<template>
  <div>
    <div>isReload: {{ isReload }}</div>
    <div>selectKeys: {{ selectKeys }}</div>
    <MTable
      v-model:is-reload="isReload"
      v-model:select-keys="selectKeys"
      :columns="tableColumns"
      :data="userList"
      :http="getDemoUserList"
      :params="params"
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

      <!-- header 插槽：每一层（含分组列）都可独立使用，无需在 column 配置 slot -->
      <template #userInfo-header="{ column }">
        <span style="display: inline-flex; align-items: center">
          <el-icon><IconUser /></el-icon>
          <span style="margin-left: 4px">{{ column.label }}</span>
        </span>
      </template>
      <template #name-header="{ column }">
        <span style="display: inline-flex; align-items: center">
          <el-icon><IconPostcard /></el-icon>
          <span style="margin-left: 4px">{{ column.label }}</span>
        </span>
      </template>
      <template #actions-header="{ column }">
        <el-tooltip :content="`自定义表头：${column.label}`" placement="top">
          <span style="display: inline-flex; align-items: center">
            <el-icon><IconSetting /></el-icon>
            <span style="margin-left: 4px">{{ column.label }}</span>
          </span>
        </el-tooltip>
      </template>
    </MTable>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/table/README.md?raw'
import { ref, reactive } from 'vue'
import { tableColumns } from './config'
import { getDemoUserList } from '@/api/examples/user'

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
