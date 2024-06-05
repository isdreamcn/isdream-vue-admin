<template>
  <div
    v-if="!appSetting.menu.mergeTopMenu"
    class="goBackTopMenuNav"
    @click="goBack"
  >
    <span>返回导航页</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppSetting } from '@/store'

const { appSetting } = useAppSetting()

const router = useRouter()
const goBack = () => {
  router.push('/topMenuNav')
}
</script>

<style scoped lang="scss">
.goBackTopMenuNav {
  padding: 0 10px;
}
</style>
