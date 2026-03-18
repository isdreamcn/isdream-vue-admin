<template>
  <el-table-column
    v-bind="column.attrs"
    :key="column.key"
    :show-overflow-tooltip="!column.slot"
    :prop="column.key"
    :label="column.label ?? column.key"
    :width="column.width"
    :fixed="column.fixed"
  >
    <template #header="headerAttrs">
      <slot v-bind="headerAttrs" name="header">
        {{ column.label ?? column.key }}
      </slot>
    </template>

    <template #default="defaultAttrs">
      <slot v-bind="defaultAttrs" name="default" :column="column" />

      <!-- 多级表头 -->
      <template v-if="column.children?.length">
        <TableColumn
          v-for="columnItem in column.children"
          :key="columnItem.key"
          :column="columnItem"
        >
          <template #header="childHeaderAttrs">
            <slot v-bind="childHeaderAttrs" name="header" />
          </template>

          <template #default="childDefaultAttrs">
            <slot
              v-bind="childDefaultAttrs"
              name="default"
              :column="columnItem"
            />
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
