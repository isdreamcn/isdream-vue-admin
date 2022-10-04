import { withInstall } from '@/utils/intsall'
import Loading from './src/loading.vue'
import LoadingLottie from './src/loading-lottie.vue'

export const MLoading = withInstall(Loading)
export default MLoading

export const MLoadingLottie = withInstall(LoadingLottie)

export * from './src/loading'
export * from './src/loading-lottie'
