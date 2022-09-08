import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/type',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        data: {
          name: '1234'
        }
      }
    }
  }
] as MockMethod[]
