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
  let selectKeysMap: Map<any, boolean> = new Map()

  const handleSelectionChange = (rows: any[]) => {
    selectKeys = rows.map(getRowKey)

    if (props.selectKeysKeep) {
      const set = new Set(selectKeys)

      data.value.forEach((row) => {
        const key = getRowKey(row)
        if (set.has(key)) {
          selectKeysMap.set(key, true)
        } else {
          selectKeysMap.delete(key)
        }
      })

      selectKeys = [...selectKeysMap.keys()]
    }
    if (changeSelectKeys) {
      changeSelectKeys(selectKeys)
    }
  }

  // 选中 rows
  const selectionRows = (rows: any[]) => {
    nextTick(() => {
      if (!elTableRef.value) return

      elTableRef.value.clearSelection()
      rows.forEach((row) => {
        elTableRef.value?.toggleRowSelection(row, true)
      })
    })
  }

  // 选中 selectKeys 对应的 rows
  const selectionSelectKeys = () => {
    const keys = props.selectKeys || []
    const set = new Set(keys)
    const rows = data.value.filter((row) => set.has(getRowKey(row)))

    selectionRows(rows)
    // 没有与selectKeys匹配的rows, 手动触发
    if (keys.length && !rows.length) {
      handleSelectionChange([])
    }
  }

  watch(
    () => props.selectKeys,
    () => {
      if (props.selectKeys?.join() === selectKeys.join()) return

      if (props.selectKeysKeep) {
        selectKeysMap = new Map()
        props.selectKeys?.forEach((key) => selectKeysMap.set(key, true))
      }
      selectionSelectKeys()
    },
    {
      immediate: true
    }
  )

  // data更新/http重新执行，重新匹配选中项
  watch(() => data.value, selectionSelectKeys)

  return {
    elTableRef,
    handleSelectionChange,
    selectionRows
  }
}
