import dayjs from 'dayjs'
import { appConfig } from '@/config'

export const setBaseUrlFile = (str: string) => {
  return str.replaceAll(
    /(!\[.*\]\(|<img.*src=")(?!blob:http|http)/g,
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
    const date = dayjs(value).format(template)
    if (date === 'Invalid Date') {
      throw new Error('Invalid Date')
    }
    return date
  } catch {
    return value?.toString() || ''
  }
}
