import type FormDialog from './formDialog.vue'
import type { ExtractPropTypes } from 'vue'
import type { FormField } from '@/components/form'
import { buildProps, definePropType, isBoolean } from '@/utils'

type FormDialogHttpGet = (
  id: number
) => Promise<Service.Result<Record<string, any>>>
type FormDialogHttpAdd = (data: any) => Promise<any>
type FormDialogHttpEdit = (id: number, data: any) => Promise<any>
type FormDialogHandler = (data: Record<string, any>) => Record<string, any>

export const formDialogProps = buildProps({
  fields: {
    type: definePropType<FormField[]>(Array),
    default: () => []
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: 0
  },
  value: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 透传 MForm 的 filter：true 时提交不回传 fields 之外的字段；
  // false 时 fields 外字段原样保留并随提交回传
  filter: {
    type: Boolean,
    default: true
  },
  // 透传 MForm 的 filterHidden：true 时字段隐藏即清数据、提交不回传隐藏字段；
  // false 时隐藏字段数据保留并回传
  filterHidden: {
    type: Boolean,
    default: true
  },
  disabledTitle: {
    type: String,
    default: '查看'
  },
  addTitle: {
    type: String,
    default: '新增'
  },
  editTitle: {
    type: String,
    default: '编辑'
  },
  httpGet: {
    type: definePropType<FormDialogHttpGet>(Function),
    default: () =>
      Promise.resolve({
        data: {}
      })
  },
  httpAdd: {
    type: definePropType<FormDialogHttpAdd>(Function),
    default: () => Promise.resolve()
  },
  httpEdit: {
    type: definePropType<FormDialogHttpEdit>(Function),
    default: () => Promise.resolve()
  },
  // httpEdit执行前调用
  handler: {
    type: definePropType<FormDialogHandler>(Function),
    default: (data: Record<string, any>) => data
  },
  // httpGet执行后调用
  getHandler: {
    type: definePropType<FormDialogHandler>(Function),
    default: (data: Record<string, any>) => data
  }
} as const)

export const formDialogEmits = {
  'update:modelValue': (visible: boolean) => isBoolean(visible),
  reload: () => true
}

export type FormDialogProps = ExtractPropTypes<typeof formDialogProps>
export type FormDialogEmits = typeof formDialogEmits

export type FormDialogInstance = InstanceType<typeof FormDialog>
