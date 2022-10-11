<template>
  <div>
    <p>响应：{{ modelValue }}</p>
    <el-button @click="modelValue.name += 1">name+1</el-button>
    <MForm
      style="max-width: 800px; margin-bottom: 50px"
      :fields="fields"
      :inline="false"
      :col-attrs="24"
      :label-width="200"
      v-model="modelValue"
      @submit="submit"
      @cancel="cancel"
    >
    </MForm>

    <p>不响应</p>
    <MForm
      :fields="fields"
      :label-width="0"
      :modelValue="modelValue"
      @submit="submit"
      @cancel="cancel"
    >
    </MForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fields } from './config'

defineOptions({
  name: 'DemoCpnsMForm'
})

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
