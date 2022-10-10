<template>
  <div>
    {{ modelValue }}
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

    <MForm
      :fields="fields"
      :label-width="0"
      v-model="modelValue"
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
