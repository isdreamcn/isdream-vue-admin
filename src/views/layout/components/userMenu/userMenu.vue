<template>
  <el-dropdown>
    <span class="el-avatar-box">
      <el-avatar :src="userInfo?.avatar" @error="errorHandler">
        {{ userInfo?.username }}
      </el-avatar>
      {{ userInfo?.username }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item disabled>修改密码</el-dropdown-item>
        <el-dropdown-item @click="layout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import config from '@/config'

defineOptions({
  name: 'LayoutCpnUserMenu'
})

const userStore = useUserStore()
const userInfo = userStore.userInfo

const router = useRouter()
const layout = () => {
  userStore.layout()
  router.push({
    name: config.loginName
  })
}

const errorHandler = () => {}
</script>

<style lang="scss" scoped>
.el-avatar-box {
  @include m-menu-theme();
  display: flex;
  align-items: center;
  .el-avatar {
    margin-right: 8px;
  }
}
</style>
