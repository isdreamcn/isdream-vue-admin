<template>
  <div>
    <p>基础用法（属性透传 el-button）</p>
    <el-space>
      <MButton>新增</MButton>
      <MButton type="success">编辑</MButton>
      <MButton link type="primary" @click="handleClick">
        无 http，触发 click
      </MButton>
    </el-space>

    <p>危险操作（danger 默认二次确认）</p>
    <el-space>
      <MButton link type="danger" :http="() => del(1)">删除</MButton>
      <MButton link type="danger" :pop="null" :http="() => del(1)">
        pop=null 关闭确认
      </MButton>
      <MButton :pop="true" :http="() => del(1)">显式开启确认</MButton>
    </el-space>

    <p>批量删除（disabledTip 置灰点击提示）</p>
    <MButton
      type="danger"
      message="确认要删除选择的数据吗？"
      :disabled="!selectKeys.length"
      disabled-tip="请选择需要删除的数据"
      :http="batchDel"
    >
      批量删除
    </MButton>
    <el-button
      style="margin-left: 12px"
      type="primary"
      link
      @click="selectKeys.length = 0"
    >
      清空选中
    </el-button>

    <p>悬浮提示</p>
    <MButton tooltip="一段提示文案">按钮</MButton>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import readme from '@/components/button/README.md?raw'
import { demoUserDel } from '@/api/examples/user'

const selectKeys = ref<number[]>([1])

const del = (id: number) => {
  return demoUserDel(id).then(() => {
    ElMessage.success('删除成功')
  })
}

const batchDel = () => {
  return Promise.all(selectKeys.value.map((id) => demoUserDel(id))).then(() => {
    selectKeys.value = []
    ElMessage.success('删除成功')
  })
}

const handleClick = () => {
  ElMessage.info('click 事件触发')
}
</script>

<style lang="scss" scoped></style>
