<template>
  <div class="m-table-container">
    <div class="m-table-container__title">
      <el-space wrap>
        <slot name="extra"></slot>
      </el-space>
    </div>
    <el-table
      class="m-table-container__main"
      :ref="selection.elTableRef"
      v-bind="$attrs"
      v-loading="props.loading || httpRes.loading"
      :data="data"
      border
      stripe
      :style="{ width: '100%' }"
      :row-key="props.rowKey"
      @selection-change="selection.handleSelectionChange"
    >
      <template v-if="props.selectKeys">
        <el-table-column type="selection" width="55" />
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
      <el-table-column
        v-for="column in props.columns"
        v-bind="column.attrs"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
      >
        <template
          v-if="column.slot || column.customRender"
          #default="{ row, $index }"
        >
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
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div v-if="props.paginationConfig" class="m-table-container__pagination">
      <el-pagination
        v-model:currentPage="paginationParams.currentPage"
        v-model:page-size="paginationParams.pageSize"
        :page-sizes="props.paginationConfig.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
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

defineOptions({
  name: 'MTable'
})

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const { paginationParams, paginationData, indexStart } = usePagination(props)

// request http
const requestFinally = () => {
  emit('update:isReload', false)
}
const httpRes = useHttpData(props, paginationParams, requestFinally)

const handleSizeChange = () => {
  paginationParams.currentPage = 1
}

// table 实际渲染的数据
const data = computed(() => httpRes.data || paginationData.value)

// selectkey
const changeSelectKeys = (selectKeys: any) => {
  emit('update:selectKeys', selectKeys)
}
const selection = useSelection(props, data, changeSelectKeys)
</script>

<style lang="scss" scoped>
.m-table-container {
  .m-table-container__title {
    display: flex;
    justify-content: flex-end;
  }
  .m-table-container__main {
    margin: 20px 0;
  }
  .m-table-container__pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
