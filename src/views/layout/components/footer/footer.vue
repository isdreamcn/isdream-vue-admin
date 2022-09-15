<template>
  <div class="footer-container">
    <div>
      Copyright ©
      <el-link type="info" href="https://isdream.cn" target="_blank"
        >isdream.cn</el-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LayoutCpnFooter'
})
</script>

<style lang="scss" scoped>
.footer-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-color-info-light-3);
  font-size: var(--el-link-font-size);
}
</style>
