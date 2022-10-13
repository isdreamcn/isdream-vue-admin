<template>
  <div>
    <el-dialog v-model="visible" :title="title" @close="cancel">
      <MForm
        :fields="props.fields"
        :model-value="formData"
        :inline="false"
        :col-attrs="24"
        :loading="loading"
        v-bind="$attrs"
        @getForm="getForm"
        @submit="submit"
        @cancel="cancel"
      ></MForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { computed, watch, ref } from 'vue'
import { cloneDeep } from '@/utils'
import { formDialogProps, formDialogEmits } from './formDialog'

defineOptions({
  name: 'MFormDialog'
})

const props = defineProps(formDialogProps)
const emit = defineEmits(formDialogEmits)

const title = computed(() => (props.id ? props.editTitle : props.addTitle))
const loading = ref(false)
const visible = ref(props.modelValue)

// elFormRef
let elFormRef: FormInstance | undefined = undefined
const getForm = (form: FormInstance) => {
  elFormRef = form
}

const formData = ref({})
const init = () => {
  visible.value = true
  const value = cloneDeep(props.value)
  if (props.id) {
    props.httpGet(props.id).then((res) => {
      formData.value = props.getHandler({ ...value, ...res })
    })
  } else {
    formData.value = props.getHandler(value)
  }
}

const cancel = () => {
  if (!visible.value) {
    return
  }
  elFormRef?.resetFields()
  visible.value = false
  emit('update:modelValue', false)
}

const submit = (formData: Record<string, any>) => {
  formData = props.handler(formData)
  loading.value = true
  let request = null
  if (props.id) {
    request = props.httpEdit(props.id, formData)
  } else {
    request = props.httpAdd(formData)
  }
  request
    .then(() => {
      cancel()
      emit('reload')
    })
    .finally(() => (loading.value = false))
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      init()
    } else {
      cancel()
    }
  }
)
</script>

<style lang="scss" scoped></style>
