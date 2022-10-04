import type Tabel from './tabel.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@/utils'

export const tabelProps = buildProps({} as const)

export const tabelEmits = {}

export type TabelProps = ExtractPropTypes<typeof tabelProps>
export type TabelEmits = typeof tabelEmits

export type TabelInstance = InstanceType<typeof Tabel>
