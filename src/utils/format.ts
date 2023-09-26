import dayjs from 'dayjs'
import { appConfig } from '@/config'
import { isFunction } from './plugins'

export const setBaseUrlFile = (str: string) => {
  return str.replaceAll(
    /(!\[.*\]\(|<img src=")(?!http)/g,
    `$1${appConfig.baseUrlFile}`
  )
}

export const removeBaseUrlFile = (str: string) => {
  return str.replaceAll(appConfig.baseUrlFile, '')
}

export const joinBaseUrlFile = (url: string) => {
  if (/^blob:/.test(url)) return url

  return /^https?:\/\//.test(url) ? url : appConfig.baseUrlFile + url
}

export const dateFormat = (
  value: dayjs.ConfigType,
  template = 'YYYY-MM-DD HH:mm:ss'
) => {
  try {
    return dayjs(value).format(template)
  } catch {
    const toString = value?.toString
    const res = isFunction(toString) ? toString() : ''
    return res || ''
  }
}
