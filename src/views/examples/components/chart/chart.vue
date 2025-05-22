<template>
  <div>
    <MChart height="500px" :option="option" @click="onClick"></MChart>
    <MChart height="500px" :option="lineOption" @click="onClick"></MChart>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/chart/README.md?raw'
import type { ChartOption } from '@/components'
import { ref } from 'vue'

const option = ref<ChartOption>({
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

const lineOption = ref<ChartOption>({
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
