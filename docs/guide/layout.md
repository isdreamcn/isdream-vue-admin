# 布局系统

isdream-vue-admin 提供两种布局模式：左侧菜单布局和顶部菜单布局。

## 布局模式

布局配置定义在 `src/views/layout/config/layout.ts` 中：

<<< ../../src/views/layout/config/layout.ts{24-28}

### 左侧菜单布局（mainLayout）

默认布局，侧边栏菜单 + 内容区域。

### 顶部菜单布局（topMenuLayout）

菜单栏在顶部，适合菜单项较少的场景。

## 切换布局

布局通过应用设置（AppSetting）控制：

```typescript
import { useStores } from '@/store'

const { app } = useStores()

// 切换到顶部菜单布局
app.setAppSetting({ layout: 'topMenuLayout' })

// 切换到左侧菜单布局
app.setAppSetting({ layout: 'mainLayout' })
```

## AppSetting 配置

AppSetting 接口定义了布局相关的所有配置项：

```typescript
interface AppSetting {
  colorPrimary: string // 主题色
  layout: LayoutKey // 布局模式
  showLogo: boolean // 显示 Logo
  menu: {
    mergeTopMenu: boolean // 合并多模块菜单
    collapsed: boolean // 折叠菜单
    mode: 'vertical' | 'horizontal' // 菜单模式
    backgroundColor: string // 菜单背景色
    textColor: string // 菜单文字颜色
    hoverBackgroundColor: string // 菜单悬停背景色
  }
  breadcrumb: {
    show: boolean // 显示面包屑
    icon: boolean // 面包屑图标
  }
  routeHistory: {
    show: boolean // 显示标签页
    actions: boolean // 标签页操作按钮
  }
  footer: {
    show: boolean // 显示页脚
  }
}
```

## 布局组件

布局系统包含以下子组件：

| 组件            | 文件                                         | 功能         |
| --------------- | -------------------------------------------- | ------------ |
| `Logo`          | `components/logo/logo.vue`                   | 应用 Logo    |
| `Menu`          | `components/menu/menu.vue`                   | 导航菜单     |
| `MenuCollapsed` | `components/menuCollapsed/menuCollapsed.vue` | 折叠菜单     |
| `Breadcrumb`    | `components/breadcrumb/breadcrumb.vue`       | 面包屑导航   |
| `RouteHistory`  | `components/routeHistory/routeHistory.vue`   | 路由标签页   |
| `UserMenu`      | `components/userMenu/userMenu.vue`           | 用户菜单     |
| `ToggleDark`    | `components/toggleDark/toggleDark.vue`       | 暗色主题切换 |
| `AppSetting`    | `components/appSetting/appSetting.vue`       | 应用设置面板 |
| `Footer`        | `components/footer/footer.vue`               | 页脚         |
