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

const generPromise = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}

export const getTestList = (params: any = {}) => {
  const { page = 1, pageSize = 10, name = '' } = params
  return generPromise().then(() => {
    let data = testList
    if (name) {
      data = testList.filter((item) => item.name?.indexOf(name) !== -1)
    }
    return {
      code: 200,
      data: data.slice((page - 1) * pageSize, page * pageSize),
      count: data.length
    }
  })
}

export const testAdd = (data: any) => {
  return generPromise().then(() => {
    testList.unshift({
      id: ++id,
      name: data.name,
      createAt: new Date()
    })
    return {
      code: 200
    }
  })
}

export const testDel = (ids: number[]) => {
  return generPromise().then(() => {
    const set = new Set(ids)
    testList = testList.filter((item) => !set.has(item.id))
    return {
      code: 200
    }
  })
}

export const testEdit = (id: number, data: any) => {
  return generPromise().then(() => {
    const item = testList.find((item) => item.id === id)
    if (!item) {
      return Promise.reject({
        code: 404,
        message: `id为${id}的用户不存在`
      })
    }
    item.name = data.name
    return {
      code: 200
    }
  })
}

export const testDetails = (id: number) => {
  return generPromise().then(() => {
    const item = testList.find((item) => item.id === id)
    if (!item) {
      return Promise.reject({
        code: 404,
        message: `id为${id}的用户不存在`
      })
    }

    return {
      code: 200,
      data: item
    }
  })
}
