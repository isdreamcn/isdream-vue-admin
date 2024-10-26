<template>
  <div class="m-chart" ref="chartRef" :style="style"></div>
</template>

<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import {
  ref,
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
// TODO: https://github.com/apache/echarts/issues/14339
let chart: Nullable<ECharts> = null

const resize = () => nextTick(() => chart?.resize())
const resizeDebounce = debounce(resize, 100)

const init = () => {
  // 基于准备好的dom，初始化echarts实例
  chart = echarts.init(chartRef.value!)
  // 绘制图表
  if (!props.lazy) {
    chart.setOption(props.options)
  }
  watch(
    () => props.options,
    () => chart?.setOption(props.options),
    {
      deep: true
    }
  )

  const attrs = useAttrs()
  useHandlers(chart, attrs)

  emit('init', chart)

  window.addEventListener('resize', resizeDebounce)
  window.addEventListener('orientationchange', resizeDebounce)
}

const destroy = () => {
  chart && echarts.dispose(chart)
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
