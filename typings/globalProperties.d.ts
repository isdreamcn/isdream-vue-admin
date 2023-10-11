import {
  dateFormat,
  checkAuth,
  getVal
} from '@/plugins/globalProperties/properties'

declare module 'vue' {
  interface ComponentCustomProperties {
    $dateFormat: typeof dateFormat
    $checkAuth: typeof checkAuth
    $getVal: typeof getVal
  }
}
