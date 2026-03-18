<template>
  <div class="m-form">
    <el-form
      ref="elFormRef"
      v-bind="$attrs"
      :label-width="props.inline ? '' : props.labelWidth"
      :inline="props.inline"
      :validate-on-rule-change="false"
      :model="formData"
      :rules="formRules"
    >
      <el-row v-bind="rowAttrs">
        <component
          :is="props.inline ? 'div' : ElCol"
          v-for="field in fields"
          :key="field.key"
          v-bind="field.colAttrs"
        >
          <el-form-item :label="field.label" :prop="field.key">
            <component
              v-bind="{
                ...field.attrs,
                key: field.key,
                disabled: field.attrs?.disabled ?? props.disabled
              }"
              :is="field.tag"
              v-if="field.slot !== true"
              v-model="formData[field.key]"
              :placeholder="field.placeholder"
              v-on="field.on || {}"
            ></component>
            <slot
              v-else
              :name="field.key"
              v-bind="{
                ...field.attrs,
                key: field.key,
                disabled: field.attrs?.disabled ?? props.disabled
              }"
              :value="formData[field.key]"
            ></slot>
          </el-form-item>
        </component>
        <!-- buttons -->
        <div v-if="props.inline" class="m-form__inline-buttons">
          <slot name="buttons">
            <el-button-group v-if="!props.disabled">
              <el-button @click="cancel">
                <MIcon
                  v-if="props.cancelIcon !== false"
                  :name="props.cancelIcon || 'icon-refreshLeft'"
                />
                {{ props.cancelText || '重置' }}
              </el-button>
              <el-button
                type="primary"
                :loading="props.loading"
                @click="submit"
              >
                <MIcon
                  v-if="!props.loading && props.submitIcon !== false"
                  :name="props.submitIcon || 'icon-search'"
                />
                {{ props.submitText || '搜索' }}
              </el-button>
            </el-button-group>
          </slot>
        </div>
      </el-row>
    </el-form>
    <div v-if="!props.inline" class="m-form__buttons">
      <slot name="buttons">
        <el-space v-if="!props.disabled" :size="20">
          <el-button @click="cancel">
            <MIcon
              v-if="props.cancelIcon !== false"
              :name="props.cancelIcon || 'icon-refreshLeft'"
            />
            {{ props.cancelText || '取消' }}
          </el-button>
          <el-button type="primary" :loading="props.loading" @click="submit">
            <MIcon
              v-if="!props.loading && props.submitIcon !== false"
              :name="props.submitIcon || 'icon-check'"
            />
            {{ props.submitText || '提交' }}
          </el-button>
        </el-space>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref, onMounted } from 'vue'
import { ElCol } from 'element-plus'
import { cloneDeep } from '@/utils'
import { formProps, formEmits } from './form'
import { useFields, useFormData, useFormRules } from './hooks'

defineOptions({
  name: 'MForm',
  inheritAttrs: false
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { fields, showFields } = useFields(props)

const { formData } = useFormData(props, showFields, (formData) => {
  emit('update:modelValue', formData.value)
})

const { formRules } = useFormRules(fields)

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
  &__buttons {
    display: flex;
    justify-content: center;
  }
  &__inline-buttons {
    margin-bottom: 18px;
  }
}
</style>
