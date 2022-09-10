export interface requestParams<T extends object = object> {
  method: string
  body: T
  headers?: { authorization?: string }
  query: T
}
