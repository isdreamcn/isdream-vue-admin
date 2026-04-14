# 权限系统

isdream-vue-admin 提供了灵活的权限管理机制，支持路由级权限和按钮级权限。

## 权限模式

在 `src/config/index.ts` 中通过 `routesHandlerOptions.setupRoutesType` 配置权限模式：

<<< ../../src/config/index.ts{77-87}

### 全量注册（all）

注册全部路由，不做权限过滤。适用于开发阶段或不需权限控制的场景。

```typescript
routesHandlerOptions: {
  setupRoutesType: 'all'
}
```

### 角色菜单匹配（roleMenu）

根据后端返回的角色菜单匹配路由，可以自定义菜单名称、层级、顺序。

```typescript
routesHandlerOptions: {
  setupRoutesType: 'roleMenu'
}
```

通过用户 Store 设置角色菜单：

```typescript
import { useStores } from '@/store'

const { user } = useStores()

// 设置角色菜单数据
user.setRoleMenu(menuData)
```

### 权限标识匹配（permissions）

根据权限字符串匹配路由，无法改变菜单名称、层级和顺序。

```typescript
routesHandlerOptions: {
  setupRoutesType: 'permissions'
}
```

通过用户 Store 设置权限：

```typescript
import { useStores } from '@/store'

const { user } = useStores()

// 设置用户权限列表
user.setUserPermissions(['dashboard', 'user:list', 'user:create'])
```

## 路由级权限

动态路由由 `src/router/useRoutesHandler/` 处理。处理流程：

1. 读取 `src/router/routes/examples/` 下的所有路由模块
2. 根据 `setupRoutesType` 配置过滤路由
3. 动态添加到路由实例

路由定义示例：

```typescript
// src/router/routes/examples/components.ts
export default {
  path: '/components',
  name: 'Components',
  meta: {
    title: '组件',
    needToken: true
  },
  children: [...]
}
```

## 按钮级权限

使用 `v-auth` 指令控制按钮级权限：

<<< ../../src/directives/auth.ts

### 使用方式

支持两种写法：

```vue
<!-- 通过 v-model 绑定权限标识 -->
<el-button v-auth="'user:delete'">删除</el-button>

<!-- 通过指令参数绑定权限标识 -->
<el-button v-auth:userDelete>删除</el-button>
```

无权限时元素会从 DOM 中移除。

## 路由守卫

项目内置 6 个路由守卫：

| 守卫               | 文件                               | 功能                         |
| ------------------ | ---------------------------------- | ---------------------------- |
| `useRedirect`      | `router/guard/useRedirect.ts`      | 重定向到第一个叶子节点       |
| `useLoading`       | `router/guard/useLoading.ts`       | 路由切换 loading             |
| `useHasToken`      | `router/guard/useHasToken.ts`      | Token 校验，未登录跳转登录页 |
| `useKeepAlive`     | `router/guard/useKeepAlive.ts`     | KeepAlive 缓存管理           |
| `useRouteHistory`  | `router/guard/useRouteHistory.ts`  | 路由历史（标签页）           |
| `useDocumentTitle` | `router/guard/useDocumentTitle.ts` | 页面标题                     |
