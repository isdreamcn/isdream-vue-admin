import { appConfig } from '@/config'

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
