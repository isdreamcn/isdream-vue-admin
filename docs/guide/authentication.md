# 用户认证

isdream-vue-admin 提供完整的用户认证模块，包含登录、注册、重置密码功能。

## 认证流程

```
用户访问 → 路由守卫检查 Token
  ├── 有 Token → 正常访问
  └── 无 Token → 跳转登录页
        ├── 登录成功 → 获取用户信息 → 设置权限 → 跳转首页
        ├── 注册 → 跳转登录页
        └── 重置密码 → 跳转登录页
```

## Token 管理

Token 配置在 `src/config/index.ts` 中：

<<< ../../src/config/index.ts{55-60}

支持的 Token 注入位置：

- `headers` — 注入到请求头（默认）
- `params` — 注入到查询参数
- `data` — 注入到请求体

## 用户 Store

用户认证状态由 `user` Store 管理：

```typescript
import { useStores } from '@/store'

const { user } = useStores()
```

### 核心方法

| 方法                              | 说明                                 |
| --------------------------------- | ------------------------------------ |
| `login(params)`                   | 登录                                 |
| `loginHandler()`                  | 登录后处理（获取用户信息、设置权限） |
| `logout()`                        | 退出登录                             |
| `setToken(token)`                 | 设置 Token                           |
| `setUserInfo(info)`               | 设置用户信息                         |
| `setUserMenu(menu)`               | 设置用户菜单                         |
| `setRoleMenu(menu)`               | 设置角色菜单                         |
| `setUserPermissions(permissions)` | 设置权限列表                         |

### 使用示例

```typescript
// 登录
await user.login({
  username: 'admin',
  password: '123456'
})

// 退出
await user.logout()
```

## 认证页面

认证相关页面在 `src/views/user/` 目录下：

```
src/views/user/
├── login/              # 登录页
│   ├── login.vue
│   └── useLogin.ts
├── register/           # 注册页
│   ├── register.vue
│   └── useSignin.ts
├── resetPassword/      # 重置密码
│   ├── resetPassword.vue
│   └── useResetPassword.ts
└── components/         # 共享组件
    ├── CaptchaButton.vue
    ├── FormButton.vue
    ├── FormDivider.vue
    ├── FormItem.vue
    ├── FormResult.vue
    └── FormWrapper.vue
```

## API 接口

用户认证接口定义在 `src/api/user/login.ts`：

| 接口                 | 说明         |
| -------------------- | ------------ |
| `userLogin`          | 用户登录     |
| `userSignin`         | 用户注册     |
| `userResetPassword`  | 重置密码     |
| `userLogout`         | 退出登录     |
| `getRoleMenu`        | 获取角色菜单 |
| `getUserPermissions` | 获取用户权限 |

## 路由守卫

`useHasToken` 守卫负责 Token 校验：

- 访问需要认证的页面时检查 Token
- Token 不存在时跳转到登录页
- 登录后自动跳回原页面

## Storage 持久化

Token 和用户信息通过 Storage 持久化，配置如下：

```typescript
// src/config/index.ts
storageConfig: {
  prefix: 'isdream',
  expires: 7 * 24 * 60 * 60 * 1000, // 7 天过期
  version: 1
}
```
