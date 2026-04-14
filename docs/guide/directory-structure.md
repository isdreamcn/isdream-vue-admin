# 目录结构

项目整体目录结构如下：

```
isdream-vue-admin/
├── build/                    # 构建配置
│   └── vite/
│       └── plugins/          # Vite 插件配置
├── public/                   # 静态资源（不经过构建）
├── src/
│   ├── api/                  # API 接口定义，按模块组织
│   ├── components/           # 全局业务组件（M 前缀自动注册）
│   ├── config/               # 应用全局配置
│   ├── directives/           # 自定义指令（v-auth、v-dateFormat）
│   ├── hooks/                # 可复用的组合式函数
│   ├── mocks/                # MSW mock handlers
│   ├── plugins/              # Vue 插件注册入口
│   ├── router/
│   │   ├── routes/           # 路由定义
│   │   ├── guard/            # 路由守卫
│   │   └── useRoutesHandler/ # 动态路由权限处理
│   ├── service/              # Axios 实例与拦截器
│   ├── storage/              # LocalStorage/SessionStorage 封装
│   ├── store/modules/        # Pinia Store（user、app、router）
│   ├── utils/                # 工具函数
│   ├── views/                # 页面组件
│   │   ├── layout/           # 布局系统
│   │   ├── user/             # 用户认证页面
│   │   └── examples/         # 示例页面
│   ├── App.vue
│   └── main.ts
├── .env                      # 公共环境变量
├── .env.dev                  # 开发环境变量
├── .env.prod                 # 生产环境变量
├── vite.config.ts            # Vite 配置
└── tsconfig.json             # TypeScript 配置
```

## 核心目录说明

### `src/api/`

API 接口定义，按功能模块组织。每个模块包含接口函数和类型定义：

```
src/api/
├── common.ts                 # 公共接口（如上传）
├── commonTypes.ts            # 公共类型
├── test.ts                   # 测试用接口
├── user/
│   ├── login.ts              # 用户认证接口
│   └── types/login.type.ts   # 用户相关类型
└── examples/                 # 示例接口
    ├── user.ts
    ├── upload.ts
    └── types/
```

### `src/components/`

全局业务组件，以 `M` 前缀自动注册。每个组件遵循统一结构：

```
src/components/table/
├── index.ts                  # 导出入口（withInstall 包装）
├── src/
│   ├── table.vue             # 组件模板
│   ├── table.ts              # Props/Emits 类型定义
│   └── hooks/                # 组件内部 hooks
└── README.md                 # 组件 API 文档
```

### `src/service/`

Axios 封装层，提供请求拦截、Token 注入、错误处理：

```
src/service/
├── index.ts                  # 创建 service 和 mockService 实例
├── service.ts                # createService 工厂函数
└── interceptors/             # 拦截器
    ├── useSetupToken.ts      # Token 自动注入
    ├── useHandleError.ts     # 统一错误处理
    ├── useLoading.ts         # 请求级 loading
    └── useResponseAdapter.ts # 响应数据适配
```

### `src/store/modules/`

Pinia Store 模块：

| Store      | 文件        | 职责                                  |
| ---------- | ----------- | ------------------------------------- |
| **user**   | `user.ts`   | 认证状态、用户信息、权限/菜单管理     |
| **app**    | `app.ts`    | 主题（亮/暗）、布局设置、CSS 变量管理 |
| **router** | `router.ts` | 路由加载状态、KeepAlive、路由历史     |

### `src/router/`

路由系统，支持动态权限路由：

```
src/router/
├── index.ts                  # 创建路由实例
├── routes/
│   ├── index.ts              # 基础路由 + 动态路由加载
│   └── examples/             # 动态路由模块
├── guard/                    # 路由守卫
│   ├── useRedirect.ts        # 重定向
│   ├── useLoading.ts         # 加载状态
│   ├── useHasToken.ts        # Token 校验
│   ├── useKeepAlive.ts       # 缓存管理
│   ├── useRouteHistory.ts    # 路由历史（标签页）
│   └── useDocumentTitle.ts   # 页面标题
└── useRoutesHandler/         # 动态路由权限处理
```
