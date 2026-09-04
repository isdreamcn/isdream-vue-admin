import type { FormProps } from '../form'
import type { FormRules, FormItemRule } from 'element-plus'
import type { Ref } from 'vue'
import { computed } from 'vue'

// 必填提示文案按组件类型区分：输入类「请填写」、选择类「请选择」、上传类「请上传」
const tagTip: Record<string, string> = {
  ElSelect: '请选择',
  ElSelectV2: '请选择',
  ElDatePicker: '请选择',
  ElTimePicker: '请选择',
  ElTimeSelect: '请选择',
  ElCascader: '请选择',
  ElTreeSelect: '请选择',
  MSelect: '请选择',
  MCheckboxGroup: '请选择',
  MRadioGroup: '请选择',
  MTreeSelect: '请选择',
  MColorPicker: '请选择',
  MUpload: '请上传'
}

const getTagTip = (tag: FormProps['fields'][number]['tag']) => {
  // tag 可能是字符串（全局注册名，如 'ElDatePicker'）或组件对象
  const name =
    typeof tag === 'string'
      ? tag
      : ((tag as { name?: string }).name ??
        (tag as { __name?: string }).__name ??
        '')
  return tagTip[name] ?? '请填写'
}

/**
 * 基于全量字段配置静态生成校验规则（不依赖表单数据）：
 * 隐藏字段无 el-form-item 注册、规则多算无害，从而避免函数式联动
 * 在每次输入时重算 rules 并连带 el-form 重渲染
 */
export const useFormRules = (fields: Ref<FormProps['fields']>) => {
  const formRules = computed(() => {
    const formRules: FormRules = {}

    fields.value.forEach((field) => {
      const validateRules: FormItemRule[] = []
      if (field.required) {
        validateRules.push({
          required: true,
          message:
            field.message ??
            `${getTagTip(field.tag)}${field.label ?? field.key}`,
          trigger: 'change'
        })
      }
      if (field.validateRules) {
        validateRules.push(...field.validateRules)
      }

      formRules[field.key] = validateRules
    })
    return formRules
  })

  return {
    formRules
  }
}
