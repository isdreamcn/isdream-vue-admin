<template>
  <el-tooltip v-bind="tooltipOption">
    <el-button v-bind="buttonAttrs" @click="click">
      <slot />
    </el-button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'MButton',
  inheritAttrs: false
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const attrs = useAttrs()

const popTypes = ['danger', 'warning']

// 传入 disabledTip 时，disabled 不透传给底层按钮（否则原生 disabled 不触发 click），
// 改为追加 is-disabled 类复刻 Element Plus 置灰样式，保持「可点击 + 置灰外观」
const useTipMode = computed(() => props.disabledTip !== undefined)
const isDisabled = computed(() => Boolean(attrs.disabled))

const buttonAttrs = computed(() => {
  const base: Record<string, any> = {
    type: 'primary' as const,
    loading: loading.value || props.loading,
    ...attrs
  }
  if (useTipMode.value) {
    // 提示模式下底层按钮保持可点击，仅用类名复刻置灰外观
    delete base.disabled
    if (isDisabled.value) {
      base.class = ['is-disabled', attrs.class]
    }
  }
  return base
})

const loading = ref(false)

const hasPop = computed(() =>
  props.pop === null
    ? false
    : props.pop || popTypes.includes(buttonAttrs.value.type)
)

const messageOption = computed(() => ({
  title: '提示',
  type: 'warning' as const,
  message: props.message || '确定执行操作吗？',
  showCancelButton: true,
  ...props.messageBoxProps
}))

const tooltipOption = computed(() => ({
  content: props.tooltip,
  disabled: !props.tooltip,
  ...props.tooltipProps
}))

function click(event: MouseEvent) {
  // 置灰提示模式：disabled 时拦截点击，仅弹出提示
  if (useTipMode.value && isDisabled.value) {
    ElMessage.warning(props.disabledTip as string)
    return
  }
  if (hasPop.value) {
    ElMessageBox(messageOption.value)
      .then(() => {
        _click(event)
      })
      .catch(() => {
        emit('cancel')
      })
  } else {
    _click(event)
  }
}

async function _click(event: MouseEvent) {
  if (props.http) {
    loading.value = true
    try {
      await props.http()
    } catch (error) {
      // 接口错误提示由全局拦截器统一处理，此处复位 loading 并触发 error 事件供调用方按需感知
      emit('error', error)
    } finally {
      loading.value = false
    }
  } else {
    emit('click', event)
  }
}
</script>
