import type { ElTable } from 'element-plus'
import type { Ref } from 'vue'
import type { TableProps } from '../table'

import { ref, watch, nextTick } from 'vue'
import { isFunction, getVal } from '@/utils'

export const useSelection = (
  props: TableProps,
  data: Ref<readonly any[]>,
  changeSelectKeys?: (selectKeys: any[]) => void
) => {
  const elTableRef = ref<InstanceType<typeof ElTable>>()

  const getRowKey = (row: any) =>
    isFunction(props.rowKey) ? props.rowKey(row) : getVal(row, props.rowKey)

  // 不需要多选框
  if (!props.selectKeys) {
    return {
      elTableRef,
      handleSelectionChange: () => {},
      selectionRows: () => {}
    }
  }

  let selectKeys: any[] = []
  const handleSelectionChange = (rows: any[]) => {
    selectKeys = rows.map(getRowKey)
    if (changeSelectKeys) {
      changeSelectKeys(selectKeys)
    }
  }

  // 选择rows
  const selectionRows = (rows: any[]) => {
    nextTick(() => {
      if (!elTableRef.value) return

      elTableRef.value.clearSelection()
      rows.forEach((row) => {
        elTableRef.value?.toggleRowSelection(row, true)
      })
    })
  }

  // 选择selectKeys对应的data rows
  const selectionSelectKeysRows = () => {
    const rows = data.value.filter((row: any) => {
      const key = getRowKey(row)
      return props.selectKeys?.includes(key)
    })
    selectionRows(rows)
  }

  watch(
    () => props.selectKeys,
    () => {
      if (props.selectKeys?.join() !== selectKeys.join()) {
        selectionSelectKeysRows()
      }
    },
    {
      immediate: true
    }
  )

  // data更新/http重新执行，重新匹配选中项
  watch(() => data.value, selectionSelectKeysRows)

  return {
    elTableRef,
    handleSelectionChange,
    selectionRows
  }
}
