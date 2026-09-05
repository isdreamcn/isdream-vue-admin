import dayjs from 'dayjs'
import { appConfig } from '@/config'

/**
 * 为相对路径拼接文件服务基地址（appConfig.baseUrlFile）
 * 空值或已是完整地址（blob: / http(s): / 协议相对地址）时原样返回
 */
export const joinBaseUrlFile = (url: string): string => {
  if (!url || /^(blob:|https?:\/\/|\/\/)/i.test(url)) return url

  const baseUrl = appConfig.baseUrlFile.replace(/\/$/, '') // 去掉末尾斜杠
  const cleanUrl = url.replace(/^\.+\//, '').replace(/^\//, '') // 去掉 ./ ../ /

  return `${baseUrl}/${cleanUrl}`
}

/** 为字符串中 Markdown 图片与 HTML img 标签的 src 拼接文件服务基地址 */
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

/**
 * 从字符串中 Markdown 图片与 HTML img 标签的 src 剥离文件服务基地址
 * 仅在图片上下文中替换，避免误删正文中恰好出现的相同字符串
 */
export const removeBaseUrlFile = (str: string) => {
  if (!str) return str
  // 与 joinBaseUrlFile 保持一致：使用去掉末尾斜杠后的 baseUrl
  const baseUrl = appConfig.baseUrlFile.replace(/\/$/, '')

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

/** dayjs 日期格式化，日期无效或格式化出错时回退为原值的字符串形式 */
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
