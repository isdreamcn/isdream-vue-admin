# 小贴士

## unplugin-vue-components/vite

问题：`unplugin-vue-components/vite`每次 dev 都会重新生成`components.d.ts`，导致项目 **`pnpm run dev` 很慢**

解决： 开发环境不使用`unplugin-vue-components/vite` **组件全部导入、生成环境按需导入**

**新问题**：在`components/*`增加全局组件，**没有该组件的类型声明**、也就不会对 props 进行类型校验

**解决**：**新增的组件第一次使用后，手动进行一次`pnpm run build`**
