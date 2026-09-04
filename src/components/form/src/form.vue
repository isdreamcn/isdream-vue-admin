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
      <!-- 字段与按钮同一行：inline 下字段区按内容宽度收缩、按钮区紧随其后（不固定行尾），
           折叠测高与高度裁剪只作用于字段容器，按钮不被裁剪、展开入口始终可达 -->
      <div class="m-form__inline-wrap" :class="{ 'is-inline': props.inline }">
        <div
          ref="inlineFieldsRef"
          class="m-form__fields"
          :class="{ 'is-collapsed': isInlineCollapsed }"
          :style="inlineFieldsStyle"
        >
          <el-row v-bind="rowAttrs">
            <RenderItem
              v-for="field in props.fields"
              :key="field.key"
              :field="field"
              :inline="props.inline"
              :disabled="props.disabled"
              :col-attrs="props.colAttrs"
            >
              <template
                v-for="(_, name) in $slots"
                :key="name"
                #[name]="slotProps"
              >
                <slot :name="name" v-bind="slotProps"></slot>
              </template>
            </RenderItem>
          </el-row>
        </div>
        <div v-if="props.inline" class="m-form__inline-buttons">
          <el-button
            v-if="showAdvancedFilter"
            link
            type="primary"
            class="m-form__expand"
            :class="{ 'is-expanded': inlineExpanded }"
            @click="toggleInlineCollapse"
          >
            {{ inlineExpanded ? '收起' : '展开' }}
            <MIcon name="icon-arrow-down" />
          </el-button>
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
      </div>
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
import { ref, watch, computed, provide, getCurrentInstance } from 'vue'
import { cloneDeep } from '@/utils'
import { formProps, formEmits } from './form'
import RenderItem from './renderItem.vue'
import {
  formDataKey,
  useCollapse,
  useFields,
  useFormData,
  useFormRules
} from './hooks'

defineOptions({
  name: 'MForm',
  inheritAttrs: false
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const { formData, initialFormData } = useFormData(props)

// 内部表单数据注入给字段级子组件（renderItem），避免逐层透传
provide(formDataKey, formData)

const { showFieldKeys } = useFields(props, formData)

// filterHidden=true（默认）时，字段从可见变为隐藏即清除其数据；
// filterHidden=false 时保留隐藏字段数据；初始即隐藏的字段始终保留回显值
watch(showFieldKeys, (keys, oldKeys) => {
  if (props.filterHidden === false) return
  oldKeys
    .filter((key) => !keys.includes(key))
    .forEach((key) => {
      formData.value[key] = undefined
    })
})

// rules 基于全量字段配置静态计算（不依赖表单数据）：隐藏字段无 el-form-item 注册、
// 规则多算无害，避免函数式联动在每次输入时重算 rules 并连带 el-form 重渲染
const { formRules } = useFormRules(computed(() => props.fields))

// inline 自动折叠
const inlineFieldsRef = ref<HTMLElement>()
const {
  inlineExpanded,
  isInlineCollapsed,
  showAdvancedFilter,
  inlineFieldsStyle,
  toggleInlineCollapse
} = useCollapse(inlineFieldsRef, props, showFieldKeys)

// 提交/取消的回传范围，filter 与 filterHidden 正交：
// filterHidden 决定 fields 内取可见字段还是全部字段，filter 决定 fields 外字段是否带回
const getSubmitData = () => {
  const submitData: Record<string, any> = {}
  if (props.filterHidden) {
    showFieldKeys.value.forEach((key) => {
      submitData[key] = cloneDeep(formData.value[key])
    })
  } else {
    props.fields.forEach((field) => {
      submitData[field.key] = cloneDeep(formData.value[field.key])
    })
  }
  if (props.filter === false) {
    const fieldKeys = new Set(props.fields.map((field) => field.key))
    for (const [key, value] of Object.entries(formData.value)) {
      if (!fieldKeys.has(key)) {
        submitData[key] = cloneDeep(value)
      }
    }
  }
  return submitData
}

// v-model 与提交同口径：update:modelValue 回传与 submit/cancel 相同范围的数据；
// 回传的是裁剪副本，父组件 v-model 回写由 useFormData 的子集等值判断吸收，不构成循环。
// 注意：本 watch 须注册在上方 showFieldKeys watch（隐藏字段清数据）之后——
// 依赖 watcher 按注册顺序执行，才能保证字段隐藏时先清数据、此处回传的已是裁剪后口径。
// 未绑定 v-model（无 update:modelValue 监听）时跳过，避免无谓的裁剪与深拷贝；
// 键名与 emit 的分发规则对齐，camelCase / kebab-case 监听均识别，
// props 于回调内实时读取（而非 setup 快照），以支持运行期绑定变化
const instance = getCurrentInstance()
watch(
  formData,
  () => {
    const vnodeProps = instance?.vnode.props || {}
    const hasModelListener =
      'onUpdate:modelValue' in vnodeProps ||
      'onUpdate:model-value' in vnodeProps
    if (!hasModelListener) return
    emit('update:modelValue', getSubmitData())
  },
  { deep: true, immediate: true }
)

// actions
const elFormRef = ref<FormInstance>()

// 重置为初始值：整体恢复到最近一次外部赋值的快照（含隐藏字段与 fields 之外的字段），
// 覆盖 el-form resetFields 只重置已注册（可见）字段的缺口
const resetFormData = () => {
  formData.value = cloneDeep(initialFormData.value)
  elFormRef.value?.clearValidate()
}

const submit = () => {
  elFormRef.value?.validate((isValid, invalidFields) => {
    if (isValid) {
      emit('submit', getSubmitData())
    } else if (invalidFields) {
      // 滚动到验证错误的字段
      const errorFieldKey = Object.keys(invalidFields)[0]
      elFormRef.value!.scrollToField(errorFieldKey)
    }
  })
}

const cancel = () => {
  resetFormData()
  emit('cancel', getSubmitData())
}

defineExpose({
  elFormRef,
  validate: (...args: Parameters<FormInstance['validate']>) =>
    elFormRef.value?.validate(...args),
  validateField: (...args: Parameters<FormInstance['validateField']>) =>
    elFormRef.value?.validateField(...args),
  // 重置全部字段（含隐藏字段），见 resetFormData
  resetFields: resetFormData,
  clearValidate: (...args: Parameters<FormInstance['clearValidate']>) =>
    elFormRef.value?.clearValidate(...args),
  scrollToField: (...args: Parameters<FormInstance['scrollToField']>) =>
    elFormRef.value?.scrollToField(...args)
})
</script>

<style lang="scss" scoped>
.m-form {
  :deep(.el-form--inline) {
    .el-select {
      min-width: 200px;
    }
  }
  .m-icon {
    margin-right: 5px;
  }
  &__inline-wrap {
    display: block;

    // inline 模式：字段区按内容宽度收缩（允许收缩换行），按钮区紧随其后而非固定行尾
    &.is-inline {
      display: flex;
      align-items: flex-start;

      .m-form__fields {
        width: auto;
        flex: 0 1 auto;
      }
    }
  }
  &__fields {
    width: 100%;
    min-width: 0;
    transition: max-height 0.3s ease;

    &.is-collapsed {
      overflow: hidden;
    }
  }
  &__inline-buttons {
    flex-shrink: 0;
    display: flex;
    align-items: center;

    .m-form__expand {
      margin-right: 12px;

      .m-icon {
        margin-left: 4px;
        margin-right: 0;
        transition: transform 0.3s ease;
      }

      // 箭头随展开状态旋转（向下 → 向上），与字段区高度过渡同步
      &.is-expanded .m-icon {
        transform: rotate(180deg);
      }
    }
  }
  &__buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
