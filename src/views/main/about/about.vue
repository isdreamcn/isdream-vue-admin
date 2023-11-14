<template>
  <div class="about">
    <el-card header="关于">
      <m-markdown-view :value="readme"></m-markdown-view>
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
import readme from '@/../README.md?raw'
import packageData from '@/../package.json'

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
