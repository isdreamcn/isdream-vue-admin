import type { ElTable } from 'element-plus'
import type { Ref } from 'vue'
import { nextTick } from 'vue'
import type { TableProps } from '../table'

import { ref, watch } from 'vue'
import { isFunction } from '@/utils'

export const useSelection = (
  props: TableProps,
  data: Ref<readonly any[]>,
  changeSelectKeys?: (selectKeys: any[]) => void
) => {
  const elTableRef = ref<InstanceType<typeof ElTable>>()

  // 不需要序号列
  if (!props.selectKeys) {
    return {
      elTableRef,
      handleSelectionChange: () => {},
      selectionRows: () => {}
    }
  }

  let selectKeys: any[] = []
  const handleSelectionChange = (rows: any) => {
    selectKeys = rows.map((row: any) =>
      isFunction(props.rowKey) ? props.rowKey(row) : row[props.rowKey]
    )
    if (changeSelectKeys) {
      changeSelectKeys(selectKeys)
    }
  }

  // 选择rows
  const selectionRows = (rows?: any[]) => {
    nextTick(() => {
      if (!elTableRef.value) {
        return
      }
      elTableRef.value.clearSelection()
      if (rows) {
        rows.forEach((row) => {
          elTableRef.value!.toggleRowSelection(row, true)
        })
      }
    })
  }

  // 选择selectKeys对应的data items
  const selectionSelectKeysRows = () => {
    selectionRows(
      data.value.filter((row: any) => {
        const key = isFunction(props.rowKey)
          ? props.rowKey(row)
          : row[props.rowKey]
        return props.selectKeys?.includes(key)
      })
    )
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

  // 支持异步data, data更新，重新匹配
  watch(() => data.value, selectionSelectKeysRows)

  return {
    elTableRef,
    handleSelectionChange,
    selectionRows
  }
}
