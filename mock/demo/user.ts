import type { RequestParams } from '../_types'
import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'
import { Random } from 'mockjs'
import { resultPagination } from '../_utils'

export default [
  {
    url: '/api/user/list',
    method: 'get',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: ({ query }: RequestParams) => {
      return {
        ...resultPagination(
          (id) => ({
            id,
            name: '@cname',
            address: '@city()',
            email: '@email',
            avatar: Random.image(
              '400x400',
              Random.color(),
              Random.color(),
              Random.first()
            ),
            createAt: '@datetime',
            updateAt: '@datetime'
          }),
          {
            page: query.page,
            pageSize: query.pageSize,
            count: 100
          }
        ),
        code: HttpStatusCode.OK,
        message: 'ok'
      }
    }
  }
] as MockMethod[]
