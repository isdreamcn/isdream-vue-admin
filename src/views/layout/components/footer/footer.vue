<template>
  <el-footer v-if="appSetting.footer.show">
    <div class="footer-container">
      <div>
        Copyright ©
        <el-link type="info" href="https://isdream.cn" target="_blank"
          >isdream.cn</el-link
        >
      </div>
    </div>
  </el-footer>
</template>

<script setup lang="ts">
import { useAppSetting } from '@/store'

defineOptions({
  name: 'LayoutCpnFooter'
})

const { appSetting } = useAppSetting()
</script>

<style lang="scss" scoped>
.footer-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--el-color-info-light-3);
  font-size: var(--el-link-font-size);
  div {
    display: flex;
    align-items: center;
    .el-link {
      margin-left: 10px;
    }
  }
}
</style>
