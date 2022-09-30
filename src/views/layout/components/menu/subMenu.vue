<template>
  <template v-for="item in props.menu" :key="item.name">
    <el-sub-menu
      v-if="Array.isArray(item.children) && item.children.length"
      :index="item.pathKey"
    >
      <template #title>
        <MIcon v-if="item.icon" :name="item.icon"></MIcon>
        <span>{{ item.title }}</span>
      </template>
      <SubMenu :menu="item.children" @click="clickMenuItem"></SubMenu>
    </el-sub-menu>
    <el-menu-item v-else :index="item.pathKey" @click="clickMenuItem(item)">
      <MIcon v-if="item.icon" :name="item.icon"></MIcon>
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { definePropType } from '@/utils'
defineOptions({
  name: 'LayoutCpnSubMenu'
})

const props = defineProps({
  menu: {
    type: definePropType<UserMenu[]>(Array),
    default: () => []
  }
})

const emit = defineEmits({
  click: (item: UserMenu) => item
})

const clickMenuItem = (item: UserMenu) => {
  emit('click', item)
}
</script>

<style lang="scss" scoped></style>
