<template>
  <div class="m-table">
    <div class="m-table__title">
      <el-space wrap>
        <slot name="extra"></slot>
      </el-space>
    </div>
    <el-table
      class="m-table__main"
      border
      stripe
      v-bind="$attrs"
      :ref="selection.elTableRef"
      v-loading="props.loading || httpRes.loading"
      :data="(data as any[])"
      :row-key="props.rowKey"
      @selection-change="selection.handleSelectionChange"
    >
      <template v-if="props.selectKeys">
        <el-table-column
          type="selection"
          width="55"
          :selectable="props.selectable"
        />
      </template>

      <template v-if="props.series">
        <el-table-column
          type="index"
          width="55"
          label="序号"
          #default="{ $index }"
        >
          {{ indexStart + $index + 1 }}
        </el-table-column>
      </template>

      <TableColumn
        v-for="column in props.columns"
        :key="column.key"
        :column="column"
      >
        <template #default="{ row, $index, column }">
          <template v-if="column.slot">
            <slot
              :name="column.key"
              :row="row"
              :index="$index"
              :value="getVal(row, column.key)"
            >
              {{
                column.customRender
                  ? column.customRender(getVal(row, column.key), row, $index)
                  : getVal(row, column.key)
              }}
            </slot>
          </template>

          <template v-else>
            {{
              column.customRender
                ? column.customRender(getVal(row, column.key), row, $index)
                : getVal(row, column.key)
            }}
          </template>
        </template>
      </TableColumn>
    </el-table>
    <!-- 分页器 -->
    <div v-if="props.paginationConfig" class="m-table__pagination">
      <el-pagination
        v-bind="props.paginationConfig"
        v-model:currentPage="paginationParams.currentPage"
        v-model:page-size="paginationParams.pageSize"
        :total="httpRes.total || props.data.length"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getVal } from '@/utils'
import { tableProps, tableEmits } from './table'
import { usePagination, useHttpData, useSelection } from './hooks'
import TableColumn from './tableColumn.vue'

defineOptions({
  name: 'MTable',
  inheritAttrs: false
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

// data 内部分页
const { paginationParams, paginationData, indexStart } = usePagination(props)

// request http
const httpRes = useHttpData(props, paginationParams, () => {
  emit('update:isReload', false)
})

const handleSizeChange = () => {
  paginationParams.currentPage = 1
}

// table 实际渲染的数据
const data = computed(() => httpRes.data || paginationData.value)

// selectkey
const selection = useSelection(props, data, (selectKeys) => {
  emit('update:selectKeys', selectKeys)
})
</script>

<style lang="scss" scoped>
.m-table {
  .m-table__title {
    display: flex;
    justify-content: flex-end;
  }
  .m-table__main {
    margin: 20px 0;
    width: 100%;
  }
  .m-table__pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
