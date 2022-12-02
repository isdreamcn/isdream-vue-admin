import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'
import Loading from './src/loading.vue'

export const MLoading = withInstall(Loading)
export default MLoading

export const MLoadingLottie = withInstall(
  defineAsyncComponent(() => import('./src/loading-lottie.vue')),
  {},
  'MLoadingLottie'
)

export * from './src/loading'
export * from './src/loading-lottie'
