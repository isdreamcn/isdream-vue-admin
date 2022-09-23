import { HttpStatusCode } from '@/constants'

declare global {
  declare type Nullable<T> = T | null
  declare type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> }
  namespace Service {
    declare interface Result<T = any> {
      code?: HttpStatusCode
      msg?: string
      data: T
    }
  }
}
