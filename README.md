# isdream-vue-admin

一个免费开源的中后台模板，基于 Vue 3 + TypeScript + Vite + Element Plus 构建，提供完整的权限系统、主题配置和丰富的二次封装组件。

## 特性

- **现代技术栈** — Vue 3、Vite、TypeScript、Pinia、Vue Router 4
- **权限管理** — 支持动态路由，三种权限模式可选（全量注册 / 角色菜单 / 权限匹配）
- **主题配置** — 明暗主题切换、自定义主色、菜单样式配置
- **布局系统** — 侧边栏布局与顶部菜单布局，运行时动态切换
- **二次封装组件** — Table、Form、FormDialog、Upload、Editor、Markdown、Chart 等
- **Mock 数据** — 基于 MSW（Mock Service Worker）的接口模拟
- **代码规范** — ESLint + Prettier + Husky + Commitlint + Commitizen

## 预览

- [在线预览](https://v3t.isdream.cn/)
- [文档站点](https://isdreamcn.github.io/isdream-vue-admin/)

## 技术栈

| 类别            | 技术         |
| --------------- | ------------ |
| 框架            | Vue 3        |
| 构建工具        | Vite 5       |
| 语言            | TypeScript   |
| UI 库           | Element Plus |
| 状态管理        | Pinia        |
| 路由            | Vue Router 4 |
| HTTP 客户端     | Axios        |
| 图表            | ECharts      |
| 富文本编辑器    | TinyMCE      |
| Markdown 编辑器 | Vditor       |
| 日期处理        | Day.js       |
| 动画            | Lottie       |
| CSS 预处理      | Sass         |
| 图片查看        | v-viewer     |
| 文档            | VitePress    |

## 目录结构

```
├── build/                  # Vite 构建配置与插件
├── docs/                   # VitePress 文档站点
├── public/                 # 静态资源
├── scripts/                # 构建辅助脚本
├── src/
│   ├── api/                # 接口定义
│   ├── assets/             # 静态资源（图片、样式、动画）
│   ├── components/         # 全局公共组件
│   ├── config/             # 应用配置（权限模式等）
│   ├── constants/          # 常量定义
│   ├── directives/         # 自定义指令（v-auth、v-dateFormat）
│   ├── hooks/              # 组合式函数
│   ├── mocks/              # MSW Mock 接口
│   ├── plugins/            # 插件注册
│   ├── router/             # 路由配置与守卫
│   ├── service/            # Axios 封装与拦截器
│   ├── storage/            # 本地存储封装
│   ├── store/              # Pinia 状态管理
│   ├── utils/              # 工具函数
│   └── views/              # 页面组件
├── typings/                # 全局类型定义
└── package.json
```

## 快速开始

### 环境要求

- Node.js ^20.19.0
- pnpm 10+

### 安装

```bash
git clone https://github.com/isdreamcn/isdream-vue-admin.git
# 或
git clone https://gitee.com/isdreamcn/isdream-vue-admin.git

cd isdream-vue-admin
pnpm install
```

### 开发

```bash
pnpm dev          # 开发环境启动
pnpm dev:prod     # 使用生产配置启动
```

### 构建

```bash
pnpm build:dev    # 开发环境构建
pnpm build:prod   # 生产环境构建
```

### 其他命令

```bash
pnpm preview      # 预览构建产物
pnpm type-check   # TypeScript 类型检查
pnpm lint         # ESLint 检查
pnpm lint:fix     # ESLint 自动修复
pnpm format       # Prettier 格式化
pnpm commit       # 使用 Commitizen 规范提交
pnpm docs:dev     # 文档站点开发
pnpm docs:build   # 文档站点构建
pnpm docs:preview # 文档站点预览
```

## 权限系统

通过 `src/config/index.ts` 中的 `setupRoutesType` 切换权限模式：

| 模式          | 说明                                               |
| ------------- | -------------------------------------------------- |
| `all`         | 注册全部路由，不做权限过滤                         |
| `roleMenu`    | 根据角色菜单匹配路由，可自定义菜单名称、层级和顺序 |
| `permissions` | 根据权限标识匹配路由，保持路由结构不变             |

路由守卫包含：Token 校验、路由重定向、加载状态、Keep-alive 缓存管理、路由历史记录、页面标题管理。

使用 `v-auth` 指令进行按钮级别的权限控制：

```html
<el-button v-auth="'user:delete'">删除</el-button>
```

## 布局系统

支持两种布局模式，可在应用设置中运行时切换：

- **侧边栏布局** — 左侧菜单 + 右侧内容区
- **顶部菜单布局** — 顶部导航 + 下方内容区

通用布局功能：可折叠菜单、Logo 显示、面包屑导航、标签页（带操作按钮）、页脚。

## 封装组件

| 组件         | 说明                                        |
| ------------ | ------------------------------------------- |
| Table        | 数据表格，支持分页、多选、HTTP 自动请求     |
| Form         | 动态表单，支持配置式字段渲染与校验          |
| FormDialog   | 弹窗表单，封装新增/编辑的 CRUD 流程         |
| Upload       | 文件上传，支持拖拽、预览、格式校验          |
| Editor       | TinyMCE 富文本编辑器，集成图片上传          |
| Markdown     | Vditor Markdown 编辑器，集成上传            |
| Chart        | ECharts 图表封装                            |
| SearchTree   | 可搜索的树形组件                            |
| TreeSelect   | 树形选择器                                  |
| ColorPicker  | 颜色选择器，支持主题色联动                  |
| Icon         | 图标组件，支持 Element Plus 图标和 iconfont |
| DeleteButton | 带确认弹窗的删除按钮                        |
| Loading      | 加载遮罩                                    |
| ActionButton | 操作按钮组件                                |
| Lottie       | Lottie 动画组件，封装 lottie-web            |

## 环境配置

项目通过 `.env`、`.env.dev`、`.env.prod` 管理环境变量：

| 变量                           | 说明                                | 默认值              |
| ------------------------------ | ----------------------------------- | ------------------- |
| `VITE_BASE_URL`                | 应用基础路径                        | `/`                 |
| `VITE_PUBLIC_PATH`             | 公共资源路径                        | `/`                 |
| `VITE_APP_TITLE`               | 应用标题                            | `isdream-vue-admin` |
| `VITE_USE_MOCK`                | 是否启用 Mock                       | `true`              |
| `VITE_BUILD_GZIP`              | 生产构建 Gzip 压缩                  | `true`              |
| `VITE_BUILD_LEGACY`            | 兼容旧版浏览器                      | `true`              |
| `VITE_BUILD_ROLLUP_VISUALIZER` | 生产构建包分析（Rollup Visualizer） | `true`              |
| `VITE_BASE_URL_API`            | API 基础地址                        | —                   |
| `VITE_BASE_URL_FILE`           | 文件服务基础地址                    | —                   |

## 代码规范

- **ESLint + Prettier** — 代码风格统一
- **Husky** — `pre-commit` 执行类型检查和 lint，`commit-msg` 校验提交信息
- **Commitlint + Commitizen** — 强制 Conventional Commits 规范

## License

[MIT](https://opensource.org/license/mit/)

Copyright (c) 2022-present isdream.cn
