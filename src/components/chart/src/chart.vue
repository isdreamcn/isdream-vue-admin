<template>
  <div ref="chartRef" class="m-chart" :style="style"></div>
</template>

<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import {
  ref,
  shallowRef,
  computed,
  useAttrs,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount
} from 'vue'
import * as echarts from 'echarts/core'
import { useECharts } from '@/plugins/echarts'
import { debounce } from '@/utils'
import { chartProps, chartEmits } from './chart'
import { useHandlers } from './hooks'

defineOptions({
  name: 'MChart'
})

useECharts()

const props = defineProps(chartProps)
const emit = defineEmits(chartEmits)

const style = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

const chartRef = ref<HTMLElement>()
// ref定义chartInstance - 点击图例报错后图例点击交互无法正常使用
// @see https://github.com/apache/echarts/issues/14339
// 使用 shallowRef 以便 defineExpose 能暴露最新实例（普通 let 变量只会暴露初始 null）
const chart = shallowRef<Nullable<ECharts>>(null)

const resize = () => nextTick(() => chart.value?.resize())
const resizeDebounce = debounce(resize, 100)

const init = () => {
  // 基于准备好的dom，初始化echarts实例
  chart.value = echarts.init(chartRef.value!)
  // 绘制图表
  if (!props.lazy) {
    chart.value.setOption(props.option)
  }
  watch(
    () => props.option,
    () => chart.value?.setOption(props.option),
    {
      deep: true
    }
  )

  const attrs = useAttrs()
  useHandlers(chart.value, attrs)

  emit('init', chart.value)

  window.addEventListener('resize', resizeDebounce)
  window.addEventListener('orientationchange', resizeDebounce)
}

const destroy = () => {
  if (chart.value) {
    chart.value.off()
    echarts.dispose(chart.value)
    chart.value = null
  }
  window.removeEventListener('resize', resizeDebounce)
  window.removeEventListener('orientationchange', resizeDebounce)
}

onMounted(() => {
  init()
  resize()
})

onBeforeUnmount(() => {
  destroy()
})

defineExpose({
  chart,
  chartRef,
  resize
})
</script>

<style lang="scss" scoped></style>
