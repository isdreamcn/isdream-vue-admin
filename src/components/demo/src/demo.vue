<!--
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 11:08:45
 * @LastEditTime: 2022-09-04 13:00:43
 * @LastEditors: mtm
-->
<template>
  <div>
    <el-button @click="handleClick">use el-button demo</el-button>
  </div>
</template>

<script lang="ts" setup>
import { demoProps, demoEmits } from './demo'

defineOptions({
  name: 'MDemo'
})

const props = defineProps(demoProps)
const emit = defineEmits(demoEmits)

const handleClick = (evt: MouseEvent) => {
  console.log(props)
  emit('click', evt)
}

defineExpose({})
</script>

<style lang="scss" scoped></style>
