<!--
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:22:21
 * @LastEditTime: 2022-09-04 22:34:43
 * @LastEditors: mtm
-->
<template>
  <div>
    Main
    <HelloWorld></HelloWorld>
  </div>
</template>

<script setup lang="ts">
import config from '@/config'
import HelloWorld from '@/components/HelloWorld.vue'
defineOptions({
  name: config.mainName
})
</script>

<style scoped lang="scss"></style>
