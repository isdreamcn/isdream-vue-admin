import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'

export const MChart = withInstall(
  defineAsyncComponent(() => import('./src/chart.vue')),
  {},
  'MChart'
)
export default MChart

export * from './src/chart'
