export interface MockRequestParams<T = any> {
  method: string
  body: T
  headers?: { authorization?: string }
  query: T
}
