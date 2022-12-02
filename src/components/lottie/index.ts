import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'

export const MLottie = withInstall(
  defineAsyncComponent(() => import('./src/lottie.vue')),
  {},
  'MLottie'
)
export default MLottie

export * from './src/lottie'
