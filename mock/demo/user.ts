import type { MockMethod } from 'vite-plugin-mock'
import type { MockRequestParams } from '../_types'
import { HttpStatusCode } from '@/constants'
import { Random } from 'mockjs'
import { generateResultPagination } from '../_utils'
import { GetDemoUserListParams, DemoUser } from '@/api/demo/user'

export default [
  {
    url: '/api/demo/user',
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
            userInfo: {
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
            pageSize: query.pageSize ?? 55,
            count: 55
          }
        ),
        code: HttpStatusCode.OK,
        message: 'OK'
      } as Service.ResultPagination<DemoUser[]>
    }
  },
  {
    url: '/api/demo/user',
    method: 'POST',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        code: HttpStatusCode.OK,
        message: 'OK'
      } as Service.Result
    }
  },
  {
    url: '/api/demo/user/:id',
    method: 'DELETE',
    timeout: 1500,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        code: HttpStatusCode.OK,
        message: 'OK'
      } as Service.Result
    }
  },
  {
    url: '/api/demo/user/:id',
    method: 'PUT',
    timeout: 2000,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        code: HttpStatusCode.OK,
        message: 'OK'
      } as Service.Result
    }
  },
  {
    url: '/api/demo/user/:id',
    method: 'GET',
    timeout: 500,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        data: {
          id: 1,
          name: '@cname',
          address: '@city()',
          email: '@email',
          userInfo: {
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
        },
        code: HttpStatusCode.OK,
        message: 'OK'
      } as Service.Result<DemoUser>
    }
  }
] as MockMethod[]
