<template>
  <div>
    <p>单选: {{ modelValue1 }}</p>
    <MSearchTree
      height="250px"
      :data="data"
      v-model="modelValue1"
      @nodeClick="nodeClick"
    >
    </MSearchTree>

    <p>多选: {{ modelValue2 }}</p>
    <MSearchTree
      height="250px"
      :data="data"
      show-checkbox
      v-model="modelValue2"
      @nodeClick="nodeClick"
    >
      <template #footer> footer插槽 </template>
    </MSearchTree>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/searchTree/README.md?raw'
import { ref } from 'vue'

const modelValue1 = ref(4)
const modelValue2 = ref([4])

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

const nodeClick = (node: any) => {
  console.log(node)
}
</script>

<style lang="scss" scoped></style>
