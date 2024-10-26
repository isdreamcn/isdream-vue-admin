import { debounce } from '@/utils'

interface UseRemLayoutConfig {
  fontSize?: number
  width?: number
  height?: number
  debounceWait?: number
}

export const useRemLayout = ({
  fontSize = 100,
  width = 1920,
  height = 1080,
  debounceWait = 100
}: UseRemLayoutConfig = {}) => {
  const htmlEl = document.documentElement
  let containerEl: Nullable<HTMLDivElement> = null

  // 计算字体缩放比例
  const calculateScale = (containerEl: HTMLDivElement) => {
    if (!containerEl) return 1
    const { clientWidth, clientHeight } = containerEl
    if (!(width && height && clientWidth && clientHeight)) return 1
    return Math.min(clientWidth / width, clientHeight / height)
  }

  // 设置 HTML 字体大小
  const setHtmlFontSize = () => {
    if (!containerEl) return
    const scale = calculateScale(containerEl)
    htmlEl.style.fontSize = `${fontSize * scale}px`
  }

  // 使用防抖来优化性能
  let debounceSetHtmlFontSize: Nullable<() => void> = null

  // 开始监听容器尺寸变化
  const start = (el: HTMLDivElement) => {
    if (debounceSetHtmlFontSize) return
    containerEl = el
    setHtmlFontSize()
    debounceSetHtmlFontSize = debounce(setHtmlFontSize, debounceWait)
    window.addEventListener('resize', debounceSetHtmlFontSize)
    window.addEventListener('orientationchange', debounceSetHtmlFontSize)
    document.body.style.fontSize = '0.16rem'
  }

  // 取消监听
  const cancel = () => {
    if (!debounceSetHtmlFontSize) return
    window.removeEventListener('resize', debounceSetHtmlFontSize)
    window.removeEventListener('orientationchange', debounceSetHtmlFontSize)
    debounceSetHtmlFontSize = null
    setTimeout(() => {
      htmlEl.style.fontSize = ''
      document.body.style.fontSize = ''
    }, debounceWait + 1)
  }

  return {
    start,
    cancel,
    setHtmlFontSize
  }
}
