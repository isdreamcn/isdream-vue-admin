import { debounce } from '@/utils'

interface UseRemLayoutConfig {
  /** 1rem 对应的像素数，默认 100（配合设计稿按 rem 写尺寸） */
  fontSize?: number
  /** 设计稿宽度，默认 1920 */
  width?: number
  /** 设计稿高度，默认 1080 */
  height?: number
  /** resize 防抖等待时间（毫秒），默认 100 */
  debounceWait?: number
}

/**
 * 大屏 rem 适配：按容器尺寸与设计稿宽高比取较小值等比缩放根元素字号；
 * start 开始监听容器变化（body 固定 0.16rem），cancel 移除监听并还原样式
 */
export const useRemLayout = ({
  fontSize = 100,
  width = 1920,
  height = 1080,
  debounceWait = 100
}: UseRemLayoutConfig = {}) => {
  const htmlEl = document.documentElement
  let containerEl: Nullable<HTMLDivElement> = null

  const calculateScale = (containerEl: HTMLDivElement) => {
    if (!containerEl) return 1
    const { clientWidth, clientHeight } = containerEl
    if (!(width && height && clientWidth && clientHeight)) return 1
    return Math.min(clientWidth / width, clientHeight / height)
  }

  const setHtmlFontSize = () => {
    if (!containerEl) return
    const scale = calculateScale(containerEl)
    htmlEl.style.fontSize = `${fontSize * scale}px`
  }

  // 使用防抖来优化性能
  let debounceSetHtmlFontSize: Nullable<(() => void) & { cancel: () => void }> =
    null

  const start = (el: HTMLDivElement) => {
    if (debounceSetHtmlFontSize) return
    containerEl = el
    setHtmlFontSize()
    debounceSetHtmlFontSize = debounce(setHtmlFontSize, debounceWait)
    window.addEventListener('resize', debounceSetHtmlFontSize)
    window.addEventListener('orientationchange', debounceSetHtmlFontSize)
    document.body.style.fontSize = '0.16rem'
  }

  const cancel = () => {
    if (!debounceSetHtmlFontSize) return
    // 先取消待执行的 debounced 回调，防止竞态
    debounceSetHtmlFontSize.cancel()
    window.removeEventListener('resize', debounceSetHtmlFontSize)
    window.removeEventListener('orientationchange', debounceSetHtmlFontSize)
    debounceSetHtmlFontSize = null
    // 同步清理样式
    htmlEl.style.fontSize = ''
    document.body.style.fontSize = ''
  }

  return {
    start,
    cancel,
    setHtmlFontSize
  }
}
