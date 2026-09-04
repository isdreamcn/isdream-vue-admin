<template>
  <el-dialog
    v-bind="$attrs"
    v-model="visible"
    class="m-form-dialog"
    :title="title"
    @close="cancel"
  >
    <MForm
      ref="mFormRef"
      v-model="formData"
      :fields="props.fields"
      :disabled="props.disabled"
      :inline="false"
      :col-attrs="24"
      :filter="props.filter"
      :filter-hidden="props.filterHidden"
      :loading="loading"
      @submit="submit"
      @cancel="cancel"
    >
      <template
        v-for="field in slotFields"
        :key="field.key"
        #[field.key]="attrs"
      >
        <slot :name="field.key" v-bind="attrs"></slot>
      </template>
    </MForm>
  </el-dialog>
</template>

<script setup lang="ts">
import type { MFormInstance } from '@/components/form'
import { computed, watch, ref, onBeforeUnmount } from 'vue'
import { cloneDeep } from '@/utils'
import { formDialogProps, formDialogEmits } from './formDialog'

defineOptions({
  name: 'MFormDialog',
  inheritAttrs: false
})

const props = defineProps(formDialogProps)
const emit = defineEmits(formDialogEmits)

const slotFields = computed(() => props.fields.filter((item) => item.slot))

const title = computed(() =>
  props.disabled
    ? props.disabledTitle
    : props.id
      ? props.editTitle
      : props.addTitle
)
const loading = ref(false)
const visible = ref(props.modelValue)

// 生成请求ID来标识每个请求
let currentRequestId = 0
// 组件卸载标志，防止异步回调在卸载后继续写状态
let isUnmounted = false

const mFormRef = ref<MFormInstance>()

const formData = ref({})
watch(
  () => props.value,
  (val) => {
    formData.value = props.getHandler(
      cloneDeep({
        ...formData.value,
        ...val
      })
    )
  },
  {
    deep: true
  }
)

const init = () => {
  visible.value = true
  const value = cloneDeep(props.value)
  if (props.id) {
    const requestId = ++currentRequestId
    props.httpGet(props.id).then((res) => {
      // 请求串扰或组件已卸载时，丢弃回调结果
      if (requestId !== currentRequestId || isUnmounted) return
      formData.value = props.getHandler({
        ...value,
        ...res.data
      })
    })
  } else {
    formData.value = props.getHandler(value)
  }
}

const cancel = () => {
  if (!visible.value) {
    return
  }
  mFormRef.value?.resetFields()
  visible.value = false
  emit('update:modelValue', false)
}

const submit = (formDataValue: Record<string, any>) => {
  const submitData = props.handler(formDataValue)
  loading.value = true
  let requestRes: Promise<any>
  if (props.id) {
    requestRes = props.httpEdit(props.id, submitData)
  } else {
    requestRes = props.httpAdd(submitData)
  }
  requestRes
    .then(() => {
      cancel()
      emit('reload')
    })
    // 错误提示已由全局拦截器 useHandleError 统一处理，此处捕获仅防止 unhandled rejection
    .catch(() => {})
    .finally(() => (loading.value = false))
}

onBeforeUnmount(() => {
  isUnmounted = true
})

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
