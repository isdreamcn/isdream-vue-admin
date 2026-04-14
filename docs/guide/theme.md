# 主题配置

isdream-vue-admin 支持亮色/暗色主题切换和 CSS 变量自定义。

## 亮色/暗色切换

使用 `useDark` 组合式函数切换主题：

```typescript
import { useDark } from '@/hooks'

const { isDark, toggleDark } = useDark()

// 切换主题
toggleDark()

// 获取当前是否为暗色主题
console.log(isDark.value) // true | false
```

## CSS 变量

通过 `useCssVariable` 组合式函数读写 CSS 变量：

```typescript
import { useCssVariable } from '@/hooks'

// 读取 CSS 变量
const color = useCssVariable('--color-primary')

// 设置 CSS 变量
import { setCssVariable } from '@/hooks'
setCssVariable('--color-primary', '#409eff')
```

## 主题色配置

主题色通过 AppSetting 管理，可使用 `MColorPickerAppTheme` 组件切换：

```vue
<MColorPickerAppTheme
  css-key="--color-primary"
  app-setting-key="colorPrimary"
/>
```

## Store 管理

主题状态由 `app` Store 管理：

```typescript
import { useStores } from '@/store'

const { app } = useStores()

// 获取当前主题
app.theme // 'light' | 'dark'

// 获取应用设置
const { appSetting, appTheme, appIsDark } = useAppSetting()
```

`app` Store 提供以下方法：

| 方法                     | 说明                     |
| ------------------------ | ------------------------ |
| `setupState()`           | 从 Storage 恢复设置      |
| `setRootCss()`           | 设置 CSS 变量到根元素    |
| `setState(key, value)`   | 设置 Store 状态          |
| `setAppSetting(partial)` | 更新应用设置（部分更新） |
| `resetAppSetting()`      | 重置为默认设置           |

## SCSS 变量

项目全局注入了以下 SCSS 文件：

- `element.scss` — Element Plus 覆盖样式
- `variables.scss` — SCSS 变量定义
- `mixins.scss` — SCSS 混入
