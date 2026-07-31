import dayjs from 'dayjs'
import { appConfig } from '@/config'

export const joinBaseUrlFile = (url: string): string => {
  if (!url || /^(blob:|https?:\/\/|\/\/)/i.test(url)) return url

  const baseUrl = appConfig.baseUrlFile.replace(/\/$/, '') // 去掉末尾斜杠
  const cleanUrl = url.replace(/^\.+\//, '').replace(/^\//, '') // 去掉 ./ ../ /

  return `${baseUrl}/${cleanUrl}`
}

export const setBaseUrlFile = (str: string): string => {
  // Markdown 图片
  str = str.replace(
    /!\[([^[\]]*)\]\((.*?)\)/g,
    (_, alt, src) => `![${alt}](${joinBaseUrlFile(src)})`
  )

  // HTML img 单/双引号 src
  str = str.replace(
    /(<img\b[^>]*?\ssrc\s*=\s*)(['"])(.*?)\2/gi,
    (_, prefix, quote, src) =>
      `${prefix}${quote}${joinBaseUrlFile(src)}${quote}`
  )

  return str
}

export const removeBaseUrlFile = (str: string) => {
  if (!str) return str
  // 与 joinBaseUrlFile 保持一致：使用去掉末尾斜杠后的 baseUrl
  const baseUrl = appConfig.baseUrlFile.replace(/\/$/, '')

  // 仅在 markdown 图片和 HTML img src 上下文中剥离，
  // 避免全局 replaceAll 误删正文中恰好出现的相同字符串
  // Markdown 图片
  str = str.replace(
    /!\[([^[\]]*)\]\((.*?)\)/g,
    (_, alt, src) => `![${alt}](${src.replaceAll(baseUrl, '')})`
  )
  // HTML img 单/双引号 src
  str = str.replace(
    /(<img\b[^>]*?\ssrc\s*=\s*)(['"])(.*?)\2/gi,
    (_, prefix, quote, src) =>
      `${prefix}${quote}${src.replaceAll(baseUrl, '')}${quote}`
  )

  return str
}

export const dateFormat = (
  value: dayjs.ConfigType,
  template = 'YYYY-MM-DD HH:mm:ss'
) => {
  try {
    const date = dayjs(value).format(template)
    if (date === 'Invalid Date') {
      return value?.toString() || ''
    }
    return date
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn('[dateFormat] Failed to format date:', e)
    }
    return value?.toString() || ''
  }
}
