<template>
  <el-breadcrumb separator="/">
    <!-- <el-breadcrumb-item
      >promotion management</a></el-breadcrumb-item
    > -->
    <el-breadcrumb-item v-for="item in matched" :key="item.path">
      <a v-if="item.children" @click="goPath(item.name)">{{
        item.meta.title || item.name
      }}</a>
      <div v-else>
        {{ item.meta.title || item.name }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import appConfig from '@/config'

defineOptions({
  name: 'LayoutCpnBreadcrumb'
})

const route = useRoute()
const matched = computed(() =>
  route.matched.filter(
    (item) =>
      !(item.meta.hiddenInBread ?? appConfig.defaultRouteMeta.hiddenInBread)
  )
)

const router = useRouter()
const goPath = (name?: string | symbol) => {
  if (!name) {
    return
  }
  router.push({
    name
  })
}
</script>

<style lang="scss" scoped></style>
