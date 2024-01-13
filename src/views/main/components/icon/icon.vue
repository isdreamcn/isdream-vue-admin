<template>
  <div>
    <div>
      <p>element plus icons</p>
      <MIcon name="IconHomeFilled"></MIcon>
      <MIcon name="icon-cpu"></MIcon>
      <MIcon name="icon-menu"></MIcon>
      <MIcon name="icon-setting"></MIcon>
    </div>
    <div>
      <p>iconfont</p>
      <MIcon name="iconfont-dianzan" color="#ff7f50"></MIcon>
      <MIcon name="iconfont-pinglun" :size="25"></MIcon>
      <MIcon name="iconfont-gengduo"></MIcon>
      <MIcon name="IconfontShoucang"></MIcon>
      <MIcon name="IconfontShoucang">slot</MIcon>
    </div>

    <MMarkdownView :value="readme"></MMarkdownView>
  </div>
</template>

<script setup lang="ts">
import readme from '@/components/icon/README.md?raw'
</script>

<style lang="scss" scoped>
:deep(.m-icon) {
  margin-right: 15px;
}
</style>
