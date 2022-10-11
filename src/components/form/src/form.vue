<template>
  <div class="m-form" :style="props.style">
    <el-form
      ref="elFormRef"
      :label-width="props.labelWidth"
      v-bind="$attrs"
      :model="formData"
      :rules="formRules"
    >
      <el-row :gutter="20">
        <el-col
          v-for="field in fields"
          :key="field.key"
          v-bind="field.colAttrs"
        >
          <el-form-item :label="field.label" :prop="field.key">
            <component
              v-if="field.slot !== true"
              v-bind="field.attrs || {}"
              :is="field.tag"
              :placeholder="field.placeholder"
              v-model="formData[field.key]"
            ></component>
            <slot
              v-else
              :name="field.key"
              :field="field"
              :value="formData[field.key]"
            ></slot>
          </el-form-item>
        </el-col>
        <!-- buttons -->
        <el-col v-if="props.inline" v-bind="defaultColAttrs">
          <slot name="buttons">
            <el-button-group>
              <el-button
                type="primary"
                :loading="props.loading"
                @click="submit"
              >
                <MIcon name="icon-search" v-if="!props.submitText" />
                {{ props.submitText || '搜索' }}
              </el-button>
              <el-button @click="cancel">
                <MIcon name="icon-refreshLeft" v-if="!props.cancelText" />
                {{ props.cancelText || '重置' }}
              </el-button>
            </el-button-group>
          </slot>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="!props.inline" class="m-form__buttons">
      <slot name="buttons">
        <el-space>
          <el-button type="primary" @click="submit" :loading="props.loading">{{
            props.submitText || '提交'
          }}</el-button>
          <el-button @click="cancel">{{
            props.cancelText || '重置'
          }}</el-button>
        </el-space>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, onMounted } from 'vue'
import { cloneDeep } from '@/utils'
import { formProps, formEmits } from './form'
import { useFields, useFormData, useFormRules } from './hooks'

defineOptions({
  name: 'MForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { fields, showFields, defaultColAttrs } = useFields(props)

const { formData } = useFormData(props, showFields, (formData) => {
  emit('update:modelValue', formData.value)
})

const { formRules } = useFormRules(props)

// actions
const elFormRef = ref<FormInstance>()
const submit = () => {
  elFormRef.value?.validate((isValid, invalidFields) => {
    if (isValid) {
      emit('submit', cloneDeep(formData.value))
    } else if (invalidFields) {
      // 滚动到验证错误的字段
      const errorFieldKey = Object.keys(invalidFields)[0]
      elFormRef.value!.scrollToField(errorFieldKey)
    }
  })
}

const cancel = () => {
  elFormRef.value?.resetFields()
  emit('cancel', cloneDeep(formData.value))
}

onMounted(() => {
  if (elFormRef.value) {
    emit('getForm', elFormRef.value)
  }
})
</script>

<style lang="scss" scoped>
.m-form {
  .m-icon {
    margin-right: 5px;
  }
  .m-form__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
