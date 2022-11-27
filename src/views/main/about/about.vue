<template>
  <div class="about">
    <el-card header="关于">
      isdream-vue-admin 是一个基于
      <el-link href="https://cn.vuejs.org/" type="primary" target="_blank"
        >Vue3</el-link
      >、
      <el-link href="https://cn.vitejs.dev/" type="primary" target="_blank"
        >Vite</el-link
      >、
      <el-link
        href="https://element-plus.gitee.io/zh-CN/"
        type="primary"
        target="_blank"
        >Element-Plus</el-link
      >、
      <el-link
        href="https://www.typescriptlang.org/"
        type="primary"
        target="_blank"
        >TypeScript</el-link
      >
      的中后台模板
    </el-card>
    <el-card header="项目信息">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="版本" label-align="right">{{
          packageData.version
        }}</el-descriptions-item>
        <el-descriptions-item label="开源协议" label-align="right">
          <el-link
            href="https://github.com/isdreamcn/isdream-vue-admin/blob/main/LICENSE"
            type="primary"
            target="_blank"
            >{{ packageData.license }}</el-link
          >
        </el-descriptions-item>
        <el-descriptions-item label="Github" label-align="right">
          <el-link
            href="https://github.com/isdreamcn/isdream-vue-admin"
            type="primary"
            target="_blank"
            >Github</el-link
          >
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card header="生成环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item
          v-for="(version, packageName) in packageData.dependencies"
          :key="packageName"
          :label="packageName"
          label-align="right"
          >{{ version }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
    <el-card header="开发环境依赖">
      <el-descriptions :column="3" border>
        <el-descriptions-item
          v-for="(version, packageName) in packageData.devDependencies"
          :key="packageName"
          :label="packageName"
          label-align="right"
          >{{ version }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import packageData from '~/package.json'

defineOptions({
  name: 'About'
})
</script>

<style lang="scss" scoped>
.about {
  .el-card {
    margin-bottom: 15px;
  }
}
</style>
