import { Storage } from './storage'
import config from '@/config'

export const db = new Storage(config.storage)
export default db

export * from './types'
