<template>
  <div>
    {{ props }}
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="Date" width="200" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { tableProps, tableEmits } from './table'

defineOptions({
  name: 'Mtable'
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)
console.log(emit)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<style lang="scss" scoped></style>
