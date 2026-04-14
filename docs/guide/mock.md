# Mock 数据

项目使用 [MSW (Mock Service Worker)](https://mswjs.io/) 进行接口 Mock，支持前后端并行开发。

## 启用/禁用 Mock

通过环境变量 `VITE_USE_MOCK` 控制：

```bash
# .env
VITE_USE_MOCK=true   # 启用 Mock
VITE_USE_MOCK=false  # 禁用 Mock
```

## Mock 文件结构

```
src/mocks/
├── browser.ts          # 浏览器端 MSW 初始化
└── handlers/           # Mock handlers
    └── ...             # 按 API 模块组织
```

## 编写 Mock

MSW 使用 `http` 方法拦截请求并返回模拟数据：

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
      ],
      count: 2
    })
  })
]
```

## HTTP 服务

项目创建了两个 Axios 实例：

```typescript
// src/service/index.ts
import { createService } from './service'

// 开发环境走 /proxyApi/，生产环境走 config.baseUrlApi
export const service = createService({ ... })

// Mock 服务，走 /mockApi/
export const mockService = createService({ ... })
```

Mock 数据的 API 调用使用 `mockService`，真实 API 使用 `service`。

## 请求拦截器

请求层提供以下拦截器：

| 拦截器               | 功能                                          |
| -------------------- | --------------------------------------------- |
| `useSetupToken`      | 请求拦截，自动注入 Bearer Token               |
| `useHandleError`     | 响应拦截，统一错误处理（400/401/403/404/500） |
| `useLoading`         | 请求级 loading 控制                           |
| `useResponseAdapter` | 响应数据适配器                                |
