import { createStorage } from './storage'
import config from '@/config'

export const db = createStorage(window.localStorage, config.storageConfig)
export default db

export type * from './storage'
