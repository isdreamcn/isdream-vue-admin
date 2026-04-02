import { HttpStatusCode } from '@/constants'

let id = 0
let testList: any[] = []

// 默认15条
for (let i = 0; i < 15; i++) {
  testList.unshift({
    id: ++id,
    name: `userName${id}`,
    createAt: new Date()
  })
}

const generatePromise = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}

export const getTestList = (params: any = {}) => {
  const { page = 1, pageSize = 10, name = '' } = params
  return generatePromise().then(() => {
    let data = testList
    if (name) {
      data = testList.filter((item) => item.name?.includes(name))
    }
    return {
      code: HttpStatusCode.OK,
      data: data.slice((page - 1) * pageSize, page * pageSize),
      count: data.length
    }
  })
}

export const testAdd = (data: { name: string }) => {
  return generatePromise().then(() => {
    testList.unshift({
      id: ++id,
      name: data.name,
      createAt: new Date()
    })
    return {
      code: HttpStatusCode.OK
    }
  })
}

export const testDel = (ids: number[]) => {
  return generatePromise().then(() => {
    const set = new Set(ids)
    testList = testList.filter((item) => !set.has(item.id))
    return {
      code: HttpStatusCode.OK
    }
  })
}

export const testEdit = (id: number, data: { name: string }) => {
  return generatePromise().then(() => {
    const item = testList.find((item) => item.id === id)
    if (!item) {
      return Promise.reject({
        code: HttpStatusCode.Not_Found,
        message: `id为${id}的用户不存在`
      })
    }
    item.name = data.name
    return {
      code: HttpStatusCode.OK
    }
  })
}

export const testDetails = (id: number) => {
  return generatePromise().then(() => {
    const item = testList.find((item) => item.id === id)
    if (!item) {
      return Promise.reject({
        code: HttpStatusCode.Not_Found,
        message: `id为${id}的用户不存在`
      })
    }

    return {
      code: HttpStatusCode.OK,
      data: item
    }
  })
}
