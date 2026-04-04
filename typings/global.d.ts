import type { ServiceResponse } from '@/service'

declare global {
  declare type Nullable<T> = T | null
  declare type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> }
  namespace Service {
    declare interface Result<T = any> extends ServiceResponse {
      data: T
    }
    declare interface ResultEmpty extends ServiceResponse {}
    declare interface ResultPagination<T = any> extends ServiceResponse {
      data: T
      count: number
    }
  }
}
