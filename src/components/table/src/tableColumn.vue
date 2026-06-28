<script lang="ts">
import { defineComponent, h } from 'vue'
import { ElTableColumn } from 'element-plus'
import type { TableColumn as Column } from './table'

/**
 * 多级表头适配组件。
 *
 * Element Plus 的 el-table-column 通过扫描自身 default 插槽里的 vnode，
 * 仅把 `type.name === "ElTableColumn"` 的节点识别为子列并打上 vParent 标记，
 * 再由子列向上查找带 tableId/columnId 的祖先来确定层级关系。
 *
 * 若每一层都用一个自定义「包装组件」（如名为 TableColumn 的组件），
 * 那么真实 el-table-column 之上就多了一层既无 tableId 也无 columnId
 * 的中间组件 —— 父子列检测链在递归到第 3 层时断裂，更深层 children 不渲染。
 *
 * 因此这里直接用渲染函数产出真实的 ElTableColumn vnode 树：
 * - 有 children：渲染分组列，其 default 插槽递归返回子列 vnode 数组
 * - 无 children：渲染叶子列，default/header 插槽透传给上层（table.vue）
 *
 * 注意：具名插槽（#default/#header）由父级 table.vue 提供，
 * 每一层递归都把它们继续透传下去，并附带当前 column，
 * 以便 table.vue 按 `${column.key}` / `${column.key}-header` 解析。
 */
export default defineComponent({
  name: 'TableColumn',
  inheritAttrs: false,
  props: {
    column: {
      type: Object as () => Column,
      required: true
    }
  },
  setup(props, { slots }) {
    const buildColumn = (column: Column) => {
      const hasChildren = !!column.children?.length

      // default/header 插槽都把 column 透传给上层（table.vue），
      // 以便其按 `${column.key}` / `${column.key}-header` 解析具名插槽。
      // 注意：具名插槽由父级 table.vue 提供，每一层递归都继续透传。
      const columnSlots: Record<string, (scope: any) => any> = {
        header: (scope: any) => slots.header?.({ ...scope, column })
      }

      if (hasChildren) {
        // 分组列：default 插槽返回递归后的子列 vnode 数组
        columnSlots.default = () =>
          (column.children as Column[]).map((child) => buildColumn(child))
      } else {
        // 叶子列：default 插槽透传给上层（table.vue）的 #default
        columnSlots.default = (scope: any) =>
          slots.default?.({ ...scope, column })
      }

      return h(
        ElTableColumn,
        {
          key: column.key,
          prop: column.key,
          label: column.label ?? column.key,
          width: column.width,
          fixed: column.fixed,
          showOverflowTooltip: !column.slot,
          ...column.attrs
        },
        columnSlots
      )
    }

    return () => buildColumn(props.column)
  }
})
</script>
