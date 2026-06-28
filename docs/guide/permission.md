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

### 权限标识 key

`roleMenu` 与 `permissions` 模式在匹配路由时，使用一个**权限标识 key** 而非 `path`：

```
key = route.name（字符串时优先） ?? route.path（兜底）
```

- 路由声明了 `name`（字符串）时，用 `name` 作为 key
- 未声明 `name` 时，回退到 `path`

这样设计的目的是**把「URL 结构（path）」与「权限契约」解耦**：当产品调整导致 `path` 变化时，只要 `name` 保持不变，后端录入的权限 / 角色菜单数据无需重新录入。

::: tip 命名建议
`name` 是稳定的业务标识，应当**显式声明且不随意改动**；`path` 面向用户与 URL，可以随产品调整。因此推荐给需要权限控制的路由显式声明 `name`。多数路由若 `path` 稳定，也可不写 `name`（回退到 `path` 同样可用）。
:::

对应到两种模式的数据格式：

| 模式 | 后端返回数据 | 取值 |
| --- | --- | --- |
| `roleMenu` | 角色菜单 `UserLoginMenu[]`（含 `name` / `path`） | 每个菜单项用 `name ?? path` 作为匹配键 |
| `permissions` | 权限字符串 `string[]` | 数组元素即 key（路由有 name 时填 name，否则填 path） |

匹配逻辑实现见 `src/router/useRoutesHandler/utils.ts` 中的 `getRouteKey` 与 `getRoleMenuKey`。

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
