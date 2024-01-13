<template>
  <div v-if="appSetting.footer.show" class="footer-container">
    <div>
      Copyright ©
      <el-link type="info" href="https://isdream.cn" target="_blank"
        >isdream.cn</el-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppSetting } from '@/store'

const { appSetting } = useAppSetting()
</script>

<style lang="scss" scoped>
.footer-container {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--el-color-info-light-3);
  padding-top: var(--el-main-padding);
  div {
    display: flex;
    align-items: center;
    .el-link {
      margin-left: 10px;
    }
  }
}
</style>
