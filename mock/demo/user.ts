import type { MockMethod } from 'vite-plugin-mock'
import type { MockRequestParams } from '../_types'
import { HttpStatusCode } from '@/constants'
import { Random } from 'mockjs'
import { generateResultPagination } from '../_utils'
import { GetDemoUserListParams, DemoUser } from '@/api/demo/user'

export default [
  {
    url: '/api/demo/user/list',
    method: 'get',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: ({ query }: MockRequestParams<GetDemoUserListParams>) => {
      return {
        ...generateResultPagination(
          (id) => ({
            id,
            name: '@cname',
            address: '@city()',
            email: '@email',
            UserInfo: {
              origin: 'mock'
            },
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
            page: query.page ?? 1,
            pageSize: query.pageSize ?? 100,
            count: 100
          }
        ),
        code: HttpStatusCode.OK,
        message: 'ok'
      } as Service.ResultPagination<DemoUser[]>
    }
  }
] as MockMethod[]
