<template>
  <div class="m-chart" ref="chartRef" :style="style"></div>
</template>

<script setup lang="ts">
import type { ECharts } from 'echarts/core'
import * as echarts from 'echarts/core'
import { ref, computed, useAttrs, watch, onMounted, onBeforeUnmount } from 'vue'
import { chartProps, chartEmits } from './chart'
import { useHandlers } from './hooks'

defineOptions({
  name: 'MChart'
})

const props = defineProps(chartProps)
const emit = defineEmits(chartEmits)

const style = computed(() => {
  const width = props.width ? `${props.width}px` : '100%'
  const height = props.height ? `${props.height}px` : '100%'
  return `width:${width};height:${height};`
})

const chartRef = ref<HTMLElement>()
// TODO: https://github.com/apache/echarts/issues/14339
let chart: ECharts | undefined = undefined

const init = () => {
  // 基于准备好的dom，初始化echarts实例
  chart = echarts.init(chartRef.value!)
  // 绘制图表
  if (!props.lazy) {
    chart.setOption(props.options)
  }
  if (!props.width || !props.height) {
    window.addEventListener('resize', () => {
      chart!.resize()
    })
  }
  emit('init', chart)
}

watch(
  () => props.options,
  () => {
    if (chart) {
      chart.setOption(props.options)
    }
  },
  {
    deep: true
  }
)

const destroy = () => {
  echarts.dispose(chart!)
}

const attrs = useAttrs()
onMounted(() => {
  init()
  useHandlers(chart!, attrs)
})

onBeforeUnmount(() => {
  destroy()
})

defineExpose({
  chart,
  chartRef
})
</script>

<style lang="scss" scoped></style>
