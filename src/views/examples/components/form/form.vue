<template>
  <div>
    <p>编辑表单、双向绑定：{{ modelValue }}</p>
    <el-button @click="modelValue.name += 'a'">name + a</el-button>
    <MForm
      v-model="modelValue"
      style="max-width: 800px; margin-bottom: 50px"
      :fields="fields"
      :inline="false"
      :col-attrs="24"
      :label-width="200"
      @submit="submit"
      @cancel="cancel"
    >
    </MForm>

    <p>搜索表单、有默认值，无双向绑定</p>
    <MForm :fields="fields" @submit="submit" @cancel="cancel"> </MForm>

    <p>联动表单：动态显隐/动态 attrs/提交过滤（默认只回传可见字段）</p>
    <MForm
      style="max-width: 800px; margin-bottom: 50px"
      :fields="linkageFields"
      :inline="false"
      :col-attrs="24"
      :label-width="200"
      @submit="submit"
    >
    </MForm>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/form/README.md?raw'
import { ref } from 'vue'
import { fields, linkageFields } from './config'

const modelValue = ref({
  name: 'demo'
})

const submit = (val: any) => {
  console.log('submit', val)
}

const cancel = (val: any) => {
  console.log('cancel', val)
}
</script>

<style lang="scss" scoped></style>
