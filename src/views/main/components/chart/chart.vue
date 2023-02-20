<template>
  <div>
    <MChart height="500px" :options="options" @click="onClick"></MChart>
    <MChart height="500px" :options="lineOptions" @click="onClick"></MChart>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/chart/README.md?raw'
import type { ChartOptions } from '@/components'
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMChart'
})

const options = ref<ChartOptions>({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})

const lineOptions = ref<ChartOptions>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
})

const onClick = () => {
  console.log('点击了charts')
}
</script>

<style lang="scss" scoped></style>
