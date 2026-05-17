## v1.4.0 (2026-05-14)

### Features

- 升级 Vite 5 至 Vite 8 并适配构建配置
- 重构用户认证模块，新增注册、重置密码功能
- 新增响应适配器拦截器并优化错误处理
- 新增静默错误配置，支持跳过全局错误弹窗
- 初始化 VitePress 文档框架及开发指南、组件 API 文档、常见问题

### Bug Fixes

- 修复 `index.html` 环境变量替换语法、组件导入路径及 Element Plus API 兼容性
- 修复内存泄漏、`lottie-web` eval 问题、`vditor` 版本锁定
- 修复 `getActivePinia()` 调用、存储模块读写、全局属性注册等问题
- 解决 CI 中 Node.js 和 pnpm 版本冲突

### Refactors

- 替换 `lodash-unified` 为 `lodash-es`，统一模块导入路径
- 迁移 Mock 从 `vite-plugin-mock` 到 `msw`
- 迁移到 ESLint Flat Config，统一代码风格
- 优化构建配置、项目依赖和类型定义
- 优化路由处理、权限映射、主题切换、暗黑模式、工具函数、指令类型、HTTP 错误处理等

### Documentation

- 更新 README 文档

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/compare/v1.3.0...v1.4.0>

---

## v1.3.0 (2026-03-17)

### Features

- 升级 axios 至 v1.13.6 并修复相关类型和错误处理
- 新增 403 错误处理及路由重定向至第一个叶子节点
- m-table 支持丢弃过期请求结果，m-form 允许禁用单个字段
- m-upload 样式调整，m-chart props.options 改为 option
- 调整全局注册组件，checkAuth 单独导出

### Bug Fixes

- 修复 m-searchTree data 和 modelValue 同时设置时默认选中失败
- 修复 m-upload max 属性在批量上传时无效
- 修复 v-viewer z-index 小于 el-dialog、全局 z-index 问题
- 修复 store 中 reloadCurrentPage、setRoleMenu、service interceptors 未使用等问题
- 修复 router redirect、saveRouteHistory 忽略 hiddenInMenu 路由
- 修复 utils 中 joinBaseUrlFile、setBaseUrlFile 多余路径分隔符
- 更新 scss 预处理器配置
- 修复 build 命令环境区分、eslint 未使用变量警告、HMR 问题

### Styles

- 统一代码格式和文档排版

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/compare/v1.2.0...v1.3.0>

---

## v1.2.0 (2025-01-19)

### Features

- 新增 setupRoutesType 路由注册方式、RouteMeta 接口及 topMenu 布局
- 新增 topMenuNav 导航组件、暗黑模式切换动画
- m-table 支持多级表头及 selectable 控制勾选
- m-form 新增 rowAttrs 属性、required trigger 改为 change
- m-upload 新增 accept 文件后缀校验及上传成功回调
- m-chart 防抖优化 chart.resize
- 新增 useRemLayout 响应式布局、菜单文字颜色主题配置
- 新增 auto-import vue、vue-router，mock 用户权限数据
- useHandleError 显示 data.message、路由参数变更自动刷新页面
- 404 页面响应式适配

### Bug Fixes

- 修复路由扁平化后 redirect 无效、redirectNode 未指向第一个叶子节点
- 修复从 404 页返回时 keep-alive 缓存丢失
- 修复 store reloadCurrentPage、m-form-dialog field slot 无效
- 修复 dateFormat 错误处理

### Performance

- 优化 .vscode 配置、文件夹结构、formatRoutes 格式化 route.meta

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/compare/v1.1.0...v1.2.0>

---

## v1.1.0 (2024-03-02)

### Features

- 自动设置 route component.name 用于 keep-alive 缓存，hiddenInMenu 路由不缓存
- 路由调整与用户管理 Demo
- el-pagination 支持 paginationConfig，m-form 默认全局注册、inline buttons、disabled 属性
- 新增 m-tree-select 下拉树、m-search-tree 可搜索树、selectKeysKeep 组件
- 新增 requestNotHandle、useServiceInterceptors 拦截器、500 状态码提示
- 新增 useService 替代 basicRequest、useLoading 使用 Map 替换计数
- 新增 createStorage 创建存储、$getVal 全局属性、wrapperLoadViteEnv 处理 env
- 新增 useRemLayout 响应式布局、dev:prod / build:prod 脚本
- vditor CDN 配置、markdown 自动补全附件地址、m-upload 文件类型预览策略

### Bug Fixes

- 修复 m-form field disabled 无效、formDialog value 更新丢失原值
- 修复 vditor input 时 setValue 导致光标消失、keep-alive tinymce 重新激活不能编辑
- 修复 el-table、el-form slot HMR 问题
- 修复 layout appSetting 循环引用、menu 未跟随 userMenu 更新
- 修复身份验证失败时主题被重置、退出登录后路由缓存和历史未清空
- 修复 element-plus 手动导入组件丢失样式、m-form useFields 修改 defaultColAttrs
- 修复 props Object default、env BASE_URL、vite plugins type 等问题

### Performance

- 多次 includes 改用 Set.has、移除无用重复代码和 defineOptions.name
- basicRequest 改为 useService、routesHandler 改为 useRoutesHandler
- store 使用 async 替换 .then、Promise.all 并行请求
- 抽离 directives 方法到 utils、readonly 导出 appConfig

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/compare/v1.0.1...v1.1.0>

---

## v1.0.1 (2023-09-09)

### Features

- editor markdown 自动补全附件地址

### Bug Fixes

- 修复 vite plugins type、mock api 参数

### Performance

- useLoading 使用 Map 替换 requestApis 计数，保证页面 API 全部请求完毕
- dependencies update、export readonly appConfig

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/compare/v1.0.0...v1.0.1>

---

## v1.0.0 (2023-03-03)

初始发布版本。

**Full Changelog**: <https://github.com/isdreamcn/isdream-vue-admin/commits/v1.0.0>
