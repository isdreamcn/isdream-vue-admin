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
  return str.replaceAll(appConfig.baseUrlFile, '')
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
