import type { ExtractPropTypes } from 'vue'
import type DeleteButton from './deleteButton.vue'
import { buildProps, definePropType } from '@/utils'

type DeleteButtonHttp = (...payload: any[]) => Promise<any>
type DeleteButtonHandler = (data: any) => any

export const deleteButtonProps = buildProps({
  disabled: {
    type: Boolean,
    default: false
  },
  submitText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  title: {
    type: String,
    default: '确认要删除选择的数据吗？'
  },
  content: {
    type: String,
    default: '数据将被永久删除，且无法恢复，请确认您的操作。'
  },
  // 接口调用成功的提示文本
  message: {
    type: String,
    default: '删除成功'
  },
  selectKeys: {
    type: Array,
    default: () => []
  },
  http: {
    type: definePropType<DeleteButtonHttp>(Function)
  },
  // 循环执行DeleteButtonHttp
  httpLoop: {
    type: Boolean,
    default: true
  },
  // 处理提交参数
  handler: {
    type: definePropType<DeleteButtonHandler>(Function),
    default: (data: any) => data
  }
} as const)

export const deleteButtonEmits = {
  click: () => true,
  reload: () => true
}

export type DeleteButtonProps = ExtractPropTypes<typeof deleteButtonProps>
export type DeleteButtonEmits = typeof deleteButtonEmits

export type DeleteButtonInstance = InstanceType<typeof DeleteButton>
