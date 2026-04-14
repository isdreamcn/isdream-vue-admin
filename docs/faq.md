# 常见问题

## 如何切换路由模式？

在 `src/config/index.ts` 中修改 `routerHistory` 配置：

```typescript
// Hash 模式（默认）
routerHistory: 'Hash'

// HTML5 模式
routerHistory: 'HTML5'
```

:::warning
使用 HTML5 模式需要服务器端配置回退路由，否则刷新页面会 404。
:::

## 如何自定义主题色？

通过 AppSetting 修改主题色：

```typescript
import { useStores } from '@/store'

const { app } = useStores()
app.setAppSetting({ colorPrimary: '#1890FF' })
```

或使用 `MColorPickerAppTheme` 组件提供可视化选择。

## 如何配置权限模式？

在 `src/config/index.ts` 中修改 `routesHandlerOptions.setupRoutesType`：

```typescript
routesHandlerOptions: {
  // 全量注册
  setupRoutesType: 'all'
  // 或角色菜单匹配
  // setupRoutesType: 'roleMenu'
  // 或权限标识匹配
  // setupRoutesType: 'permissions'
}
```

详见 [权限系统](/guide/permission.md)。

## 如何添加新组件？

1. 在 `src/components/` 下创建组件目录，遵循以下结构：

```
src/components/myComponent/
├── index.ts          # 导出入口
├── src/
│   ├── myComponent.vue
│   └── myComponent.ts  # Props/Emits 定义
└── README.md         # API 文档
```

2. 组件名以 `M` 前缀自动注册（如 `MMyComponent`）

3. 在 `src/components/index.ts` 中导出组件

## 如何禁用 Mock？

修改 `.env` 文件：

```bash
VITE_USE_MOCK=false
```

## 如何修改 Token 配置？

在 `src/config/index.ts` 中修改 `serviceTokenConfig`：

```typescript
serviceTokenConfig: {
  position: 'headers',       // 'headers' | 'params' | 'data'
  key: 'Authorization',
  value: 'Bearer TOKEN',
  expires: 7 * 24 * 60 * 60 * 1000
}
```

## 如何修改 API 基础地址？

修改对应环境的 `.env` 文件：

```bash
# .env.dev（开发环境）
VITE_BASE_URL_API=http://localhost/

# .env.prod（生产环境）
VITE_BASE_URL_API=https://api.example.com/
```
