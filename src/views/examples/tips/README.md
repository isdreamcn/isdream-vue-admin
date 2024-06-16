# 小贴士

## unplugin-vue-components/vite

**问题:** `unplugin-vue-components/vite`每次 dev 都会重新生成`components.d.ts`，导致项目 **`pnpm run dev` 很慢**

**解决:** 开发环境不使用`unplugin-vue-components/vite` **组件全部导入、生成环境按需导入**

**新问题:** 在`components/*`增加全局组件，**没有该组件的类型声明**、也就不会对 props 进行类型校验

**解决:** **新增的组件第一次使用后，手动进行一次`pnpm run build`**

## unplugin-auto-import/vite

**问题:** `unplugin-auto-import/vite` 不能根据 `props.fields.tag` 自动导入组件

**原因:** `@/components/form/src/form.vue` 使用 `<component :is="props.fields.tag"></component>`进行组件渲染

**解决:** `props.fields.tag` 里使用的组件需要在 `@/plugins/components/components` 进行导出，进而全局注册
