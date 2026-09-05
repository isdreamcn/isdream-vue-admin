import type { CSSProperties, Ref } from 'vue'
import type { FormProps } from '../form'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * inline 表单自动折叠 Hook
 * 根据字段渲染后的换行情况判断是否显示「展开」按钮，并控制字段区域折叠高度
 */
export const useCollapse = (
  inlineFieldsRef: Ref<HTMLElement | undefined>,
  props: FormProps,
  showFieldKeys: Ref<string[]>
) => {
  const inlineExpanded = ref(false)
  const hasInlineOverflow = ref(false)
  const inlineCollapsedHeight = ref(0)
  const inlineFullHeight = ref(0)

  const resetCollapseState = () => {
    hasInlineOverflow.value = false
    inlineExpanded.value = false
    inlineCollapsedHeight.value = 0
    inlineFullHeight.value = 0
  }

  // 仅 inline 模式且开启 autoCollapse 时启用自动折叠；
  // disabled（查看态）时不折叠，避免字段被裁剪且无展开入口导致内容不可达
  const shouldAutoCollapse = computed(
    () => props.inline && props.autoCollapse && !props.disabled
  )
  const isInlineCollapsed = computed(
    () =>
      shouldAutoCollapse.value &&
      hasInlineOverflow.value &&
      !inlineExpanded.value
  )
  const showAdvancedFilter = computed(
    () => shouldAutoCollapse.value && hasInlineOverflow.value
  )
  // 折叠/展开两态均设置具体 maxHeight（而非展开态留空），
  // 使 max-height 过渡动画在两个方向都能生效
  const inlineFieldsStyle = computed<CSSProperties | undefined>(() => {
    if (!shouldAutoCollapse.value || !hasInlineOverflow.value) {
      return undefined
    }
    const height = isInlineCollapsed.value
      ? inlineCollapsedHeight.value
      : inlineFullHeight.value
    return height ? { maxHeight: `${height}px` } : undefined
  })

  const toggleInlineCollapse = () => {
    inlineExpanded.value = !inlineExpanded.value
  }

  // 检测 inline 字段是否超过一行：通过子元素 offsetTop 判断是否存在第二行，
  // 并记录第一行高度（折叠高度）与完整内容高度（展开高度）
  const updateInlineOverflow = async () => {
    await nextTick()

    if (!shouldAutoCollapse.value) {
      resetCollapseState()
      return
    }

    const rowEl = inlineFieldsRef.value?.querySelector('.el-row')
    if (!rowEl) return

    // 过滤隐藏节点，避免其影响换行判断；
    // 用 getClientRects 而非 offsetParent 判断，避免 position: fixed 节点被误判为隐藏
    const children = Array.from(rowEl.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && el.getClientRects().length > 0
    )
    const firstChild = children[0]

    if (!firstChild) {
      resetCollapseState()
      return
    }

    const firstRowTop = firstChild.offsetTop
    const firstRowChildren = children.filter(
      (el) => el.offsetTop === firstRowTop
    )
    const firstRowBottom = Math.max(
      ...firstRowChildren.map((el) => el.offsetTop + el.offsetHeight)
    )
    const fullBottom = Math.max(
      ...children.map((el) => el.offsetTop + el.offsetHeight)
    )

    inlineCollapsedHeight.value = firstRowBottom - firstRowTop
    inlineFullHeight.value = fullBottom - firstRowTop
    hasInlineOverflow.value = children.some((el) => el.offsetTop > firstRowTop)

    if (!hasInlineOverflow.value) {
      inlineExpanded.value = false
    }
  }

  let resizeObserver: ResizeObserver | undefined

  onMounted(() => {
    updateInlineOverflow()

    if (typeof ResizeObserver === 'undefined') return
    resizeObserver = new ResizeObserver(() => updateInlineOverflow())
    if (inlineFieldsRef.value) {
      resizeObserver.observe(inlineFieldsRef.value)
    }
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
  })

  // 字段 key 集合（显隐变化）或折叠开关变化后，等待 DOM 更新再重新判断是否换行；
  // 按 key 集合比对而非数组引用，避免函数式 attrs 联动在每次输入时触发强制布局测量
  watch(
    [() => showFieldKeys.value.join(','), shouldAutoCollapse],
    () => updateInlineOverflow(),
    { flush: 'post' }
  )

  return {
    inlineExpanded,
    isInlineCollapsed,
    showAdvancedFilter,
    inlineFieldsStyle,
    toggleInlineCollapse
  }
}
