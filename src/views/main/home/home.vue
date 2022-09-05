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
