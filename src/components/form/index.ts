import { withInstall } from '@/utils'
import Form from './src/form.vue'
import { formComponents } from './src/components'

export const MForm = withInstall(Form, formComponents)
export default MForm

export * from './src/form'
