import type { AppUsePlugin } from '../types'
import * as properties from './properties'

export const useGlobalProperties: AppUsePlugin = (app) => {
  for (const [key, property] of Object.entries(properties)) {
    const _key = '$' + key

    if (app.config.globalProperties[_key]) {
      console.warn(`globalProperties ${_key} have been registered`)
      continue
    }

    app.config.globalProperties[_key] = property
  }
}
