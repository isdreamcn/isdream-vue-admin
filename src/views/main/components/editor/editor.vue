<template>
  <div>
    <p>{{ content }}</p>
    <div class="btns">
      <ElButton @click="setContent" type="primary">修改content</ElButton>
    </div>
    <MEditor v-model="content" @mouseDown="mouseDown"></MEditor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoCpnsMEditor'
})

const content = ref('123')
const setContent = () => {
  content.value += 'abc'
}

const mouseDown = () => {
  console.log('mouseDown')
}
</script>

<style lang="scss" scoped>
.btns {
  margin-bottom: 20px;
}
</style>
