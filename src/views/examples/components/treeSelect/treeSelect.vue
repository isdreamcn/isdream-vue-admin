<template>
  <div>
    <p>单选 {{ moduleValue1 }}</p>
    <MTreeSelect v-model="moduleValue1" :data="data"></MTreeSelect>

    <p>选择框-多选 {{ moduleValue2 }}</p>
    <MTreeSelect
      v-model="moduleValue2"
      :data="data"
      :multiple="true"
      :show-checkbox="true"
    ></MTreeSelect>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/treeSelect/README.md?raw'
import { ref } from 'vue'

const moduleValue1 = ref(4)
const moduleValue2 = ref([4])

const data = ref([
  {
    id: 1,
    name: 'Level one 1',
    children: [
      {
        id: 4,
        name: 'Level two 1-1',
        children: [
          {
            id: 5,
            name: 'Level two 1-1-1'
          }
        ]
      },
      {
        id: 6,
        name: 'Level two 1-2',
        children: [
          {
            id: 7,
            name: 'Level two 1-2-1'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Level one 2'
  }
])
</script>

<style lang="scss" scoped></style>
