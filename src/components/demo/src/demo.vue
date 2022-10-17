<template>
  <div class="m-demo">
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
