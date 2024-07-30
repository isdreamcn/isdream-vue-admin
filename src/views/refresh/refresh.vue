<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { isString } from '@/utils'

const fullPath = useRoute().query.fullPath
const router = useRouter()

if (isString(fullPath)) {
  router.replace(fullPath)
} else {
  router.back()
}
</script>

<style lang="scss" scoped></style>
