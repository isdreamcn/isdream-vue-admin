<template>
  <el-dropdown>
    <span class="avatar__container">
      <el-avatar :src="userInfo?.avatar" @error="errorHandler">
        <m-icon name="iconUserFilled"></m-icon>
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
    name: config.routeLoginName
  })
}

const errorHandler = () => {}
</script>

<style lang="scss" scoped>
.avatar__container {
  @include m-menu-theme();
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: unset;
  }
  .el-avatar {
    margin-right: 8px;
    font-size: 18px;
  }
}
</style>
