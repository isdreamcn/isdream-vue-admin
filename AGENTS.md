# AGENTS.md

## 项目概述

`isdream-vue-admin` 是基于 **Vue 3 + TypeScript + Vite 8 + Element Plus** 的中后台管理模板（v1.4.0），提供权限系统、主题/布局切换、MSW Mock、以及一套以 `M` 为前缀的二次封装组件（Table / Form / FormDialog / Upload / Editor / Markdown / Chart 等）。

- 包管理器：**pnpm 10+**（`.npmrc` 中 `engine-strict=true`，强制 Node ^20.19.0）。存在 `preinstall` 脚本，请用 pnpm 而非 npm/yarn。
- 路径别名：`@/` → `src/`（同时配置在 `tsconfig.json` 与 `vite.config.ts`）。

## 常用命令

```bash
pnpm dev            # 开发启动（--mode dev，默认开启 MSW Mock）
pnpm dev:prod       # 用生产环境配置启动
pnpm build:dev      # 开发环境构建
pnpm build:prod     # 生产环境构建
pnpm type-check     # vue-tsc 类型检查（pre-commit 会跑）
pnpm lint           # ESLint 检查（pre-commit 会跑）
pnpm lint:fix       # ESLint 自动修复
pnpm format         # Prettier 格式化
pnpm commit         # Commitizen 规范提交（也可直接 git commit，commit-msg 会校验）
pnpm test           # Vitest 测试（watch 模式）
pnpm test:run       # Vitest 单次执行全量测试
pnpm test:coverage  # Vitest 覆盖率报告
pnpm create:template <目录> [--init]  # 从当前 HEAD 生成新项目精简模板（移除文档/测试）
pnpm docs:dev       # VitePress 文档站点
```

> Husky `pre-commit` 执行 `type-check` + `lint`；`commit-msg` 用 commitlint 强制 Conventional Commits（subject 不得以大写字母开头）。提交前确保这两步通过。

## 测试约定

- 测试框架为 **Vitest + happy-dom**，配置在 `vitest.config.ts`，全局 setup 见 `src/test/setup.ts`。
- 测试文件放在被测模块同级的 `__tests__/` 目录（如 `src/utils/__tests__/format.test.ts`）。
- 测试中 `vi.mock('@/config')` 等方式隔离 `appConfig`；修改被测模块行为后，同步检查对应 `__tests__` 用例。

## 代码风格

- **Prettier**（`.prettierrc`）：2 空格缩进、单引号、**无分号**、无尾逗号、`printWidth: 80`、LF 换行。新代码须遵循。
- **ESLint**（`eslint.config.js`，Flat Config）：`no-undef` 关闭（由 TS 处理）、`eqeqeq` 警告、`@typescript-eslint/no-explicit-any` 关闭、未用参数以 `_` 前缀忽略。
- **TypeScript**：`strict` + `noUnusedLocals` + `noUnusedParameters`。
- **SCSS**：`vite.config.ts` 通过 `css.preprocessorOptions.scss.additionalData` 全局注入了 `@/assets/styles/element.scss`、`variables.scss`、`mixins.scss`——在任意 `.scss` 中可直接使用其变量/mixin，**无需手动 `@use`**。
- 输出/注释统一使用**中文**（与现有代码一致）。

## 自动导入与组件注册（重要）

- `unplugin-auto-import` 全局自动导入 **vue** 与 **vue-router** 的 API（如 `ref`、`computed`、`useRoute`），无需手动 import；类型声明见 `auto-imports.d.ts`（生成文件，勿手改）。
- Element Plus 组件在**生产构建**时由 `unplugin-vue-components` + `ElementPlusResolver` 自动按需引入（`importStyle: 'sass'`）；开发环境则全量注册（见 `src/plugins/components`）。
- `src/components` 下以 **`M` 开头**的组件在生产构建中被自动解析导入；其声明见 `components.d.ts`（生成文件，勿手改）。
- `@element-plus/icons-vue` 图标在 `src/plugins/components` 中以 **`Icon` 前缀**全局注册（如 `IconUser`），用于动态组件场景。

## 架构与分层

```
src/
├── config/index.ts        # 应用中枢 appConfig（readonly），权限模式/路由历史/token/storage/路由 meta 默认值
├── api/                   # 接口定义（按模块分目录，类型放同级 types/）
├── components/            # M 前缀二次封装组件（见各组件 README.md）
├── directives/            # v-auth（按钮权限）、v-dateFormat
├── hooks/                 # 组合式函数（theme/*、useRemLayout）
├── mocks/                 # MSW handlers，handlers/index.ts 汇总
├── plugins/               # 插件注册入口 setupAppPlugins（pinia/router/directives/全局属性/组件/viewer/dayjs）
├── router/
│   ├── routes/            # 静态路由：examples/* 与 user/* 通过 import.meta.glob 自动加载
│   ├── guard/             # 路由守卫：token/keepAlive/loading/redirect/routeHistory/documentTitle
│   └── useRoutesHandler/  # 按 setupRoutesType 动态注册路由（all / roleMenu / permissions）
├── service/               # Axios 封装 createService + 拦截器
├── storage/               # localStorage 封装 db（prefix=isdream，带版本/过期）
├── store/modules/         # Pinia: app / router / user；useStores() 聚合
├── utils/                 # 工具函数（按文件分模块，统一从 index.ts 导出）
└── views/                 # 页面组件
typings/                   # 全局类型：Nullable、PartialDeep、Service.Result/ResultEmpty/ResultPagination、env 类型
build/                     # Vite 构建辅助：utils.ts、vite/plugins/*
docs/                      # VitePress 文档站点（guide/ 与 components/）
```

### 关键约定

- **配置中枢**：几乎所有运行时行为集中在 `src/config/index.ts` 的 `appConfig`（`readonly`）。修改权限模式、路由历史（`Hash`/`HTML5`）、token 注入方式、storage 前缀/过期、路由 meta 默认值都在此处。
- **权限模式**：`appConfig.routesHandlerOptions.setupRoutesType` 取值 `all`（全量注册）/ `roleMenu`（按角色菜单匹配，默认）/ `permissions`（按权限标识匹配）。按钮级权限用 `v-auth="'xxx:yyy'"`。改路由或菜单逻辑务必先读 `src/router/useRoutesHandler/` 与 `src/store/modules/user.ts`。
- **请求层**：`src/service/index.ts` 导出两个实例——`service`（真实接口，dev 走 `/proxyApi/` 代理到 `VITE_BASE_URL_API`）与 `mockService`（`/mockApi/`，配合 MSW）。统一返回类型 `ServiceResponse { code, message, data, count }`；后端格式不一致时用 `useResponseAdapter` 适配（见 `service/index.ts` 注释示例）。
- **Mock**：`VITE_USE_MOCK=true` 时 `main.ts` 启动 MSW worker。新增 Mock 在 `src/mocks/handlers/` 下按模块建文件，并到 `handlers/index.ts` 汇总导出。
- **存储**：用 `import db from '@/storage'`，key 自动加 `isdream-` 前缀；`db.set(key, value, { expires })`、`db.get`、`db.removeKeys`。
- **新增 API**：放 `src/api/<模块>/`，类型放同级 `types/`；新增页面路由放 `src/router/routes/examples/`（会被 glob 自动加载）。

## 环境变量

通过 `.env`（公共）、`.env.dev`、`.env.prod` 管理，仅 `VITE_` 前缀暴露给前端：

| 变量                           | 说明                                      |
| ------------------------------ | ----------------------------------------- |
| `VITE_BASE_URL`                | 应用基础路径（HTML5 history 的 base）     |
| `VITE_APP_TITLE`               | 应用标题                                  |
| `VITE_USE_MOCK`                | 是否启用 MSW Mock                         |
| `VITE_BUILD_GZIP`              | 生产构建 Gzip/Brotli 压缩                 |
| `VITE_BUILD_ROLLUP_VISUALIZER` | 生成 `stats.html` 包分析                  |
| `VITE_BASE_URL_API`            | 真实 API 地址（dev 经 `/proxyApi/` 代理） |
| `VITE_BASE_URL_FILE`           | 文件服务地址                              |

类型定义在 `typings/env.d.ts`；新增环境变量须同步该文件。

## 生成文件 / 勿手改

`auto-imports.d.ts`、`components.d.ts`（由 unplugin 生成，被 git 跟踪、勿手改）、`dist/`、`stats.html`、`docs/.vitepress/{cache,dist}`。

## 已知坑点

- **HTML5 路由模式刷新路径累积**：`createWebHistory(base)` 下 `location.pathname` 含 base 前缀，`store/modules/user.ts` 的 `getRouteLocationRaw` 已剥离 base，修改此处时勿重新拼接 base（详见代码注释与 commit `298bbcf`）。
- **全局 loading 锁定**：`reloadCurrentPage` 无论成功失败都必须恢复 `routerStore` 的 `loading:false / closeLoading:true`，否则与 `setState` 的 `(loading && !closeLoading)` 锁定逻辑叠加会永久卡死（见 `user.ts` 注释）。
- 组件请优先查阅对应 `README.md`（如 `src/components/table/README.md`）与 `docs/components/` 文档，避免重复造轮子。
