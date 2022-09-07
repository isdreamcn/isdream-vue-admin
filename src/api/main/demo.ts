import service from '@/service'

export const demo = (params?: any) => {
  return service.request({
    method: 'GET',
    params,
    url: 'https://api.isdream.cn/homepage/website/type'
  })
}
