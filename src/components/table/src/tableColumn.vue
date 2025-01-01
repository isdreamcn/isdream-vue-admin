<template>
  <el-table-column
    v-bind="column.attrs"
    :show-overflow-tooltip="!column.slot"
    :key="column.key"
    :prop="column.key"
    :label="column.label ?? column.key"
    :width="column.width"
    :fixed="column.fixed"
  >
    <template #header="attrs">
      <slot v-bind="attrs" name="header">
        {{ column.label ?? column.key }}
      </slot>
    </template>

    <template #default="attrs">
      <slot v-bind="attrs" name="default" :column="column" />

      <!-- 多级表头 -->
      <template v-if="column.children?.length">
        <TableColumn
          v-for="columnItem in column.children"
          :key="columnItem.key"
          :column="columnItem"
        >
          <template #header="attrs">
            <slot v-bind="attrs" name="header" />
          </template>

          <template #default="attrs">
            <slot v-bind="attrs" name="default" :column="columnItem" />
          </template>
        </TableColumn>
      </template>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { TableColumn as Column } from './table'

defineOptions({
  name: 'TableColumn'
})

withDefaults(
  defineProps<{
    column: Column
  }>(),
  {}
)

defineSlots<{
  header(props: any): any
  default(props: any): any
}>()
</script>

<style lang="scss" scoped></style>
