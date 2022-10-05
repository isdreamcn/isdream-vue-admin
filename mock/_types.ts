export interface RequestParams<T extends object = any> {
  method: string
  body: T
  headers?: { authorization?: string }
  query: T
}
