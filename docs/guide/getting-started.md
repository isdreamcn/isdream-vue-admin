# 快速开始

## 环境要求

- [Node.js](https://nodejs.org/) ^20.19.0
- [pnpm](https://pnpm.io/) 10.x

:::tip
项目通过 `preinstall` 脚本强制检查包管理器，请务必使用 pnpm。
:::

## 获取代码

```bash
git clone https://github.com/isdreamcn/isdream-vue-admin.git
cd isdream-vue-admin
```

## 安装依赖

```bash
pnpm install
```

## 启动开发服务器

```bash
# 使用开发环境变量启动
pnpm dev
```

启动后访问 `http://localhost:5173` 即可查看项目。

## 构建项目

```bash
# 生产构建
pnpm build:prod

# 开发构建
pnpm build:dev
```

## 预览构建产物

```bash
pnpm preview
```

## 其他命令

| 命令              | 说明                       |
| ----------------- | -------------------------- |
| `pnpm type-check` | TypeScript 类型检查        |
| `pnpm lint`       | ESLint 代码检查            |
| `pnpm lint:fix`   | ESLint 自动修复            |
| `pnpm format`     | Prettier 格式化            |
| `pnpm commit`     | 使用 Commitizen 规范化提交 |

## 在线预览

项目在线预览地址：[https://v3t.isdream.cn/](https://v3t.isdream.cn/)
