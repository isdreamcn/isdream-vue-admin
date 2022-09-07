export type StorageType = 'localStorage' | 'sessionStorage'

export interface StorageConfig {
  type: StorageType
  version: number
  prefix?: string
  expires?: number
}

export interface StorageSetOptions {
  expires?: number
  time?: number
}

export interface StorageSetData {
  value: any
  version: number
  expires?: number
  time: number
}
