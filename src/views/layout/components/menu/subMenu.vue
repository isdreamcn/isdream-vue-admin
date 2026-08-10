<template>
  <el-sub-menu
    v-if="Array.isArray(menu.children) && menu.children.length"
    :index="menu.path"
  >
    <template #title>
      <MIcon v-if="menu.icon" :name="menu.icon"></MIcon>
      <span>{{ menu.title }}</span>
    </template>
    <SubMenu
      v-for="item in menu.children"
      :key="item.path"
      :menu="item"
      @click="clickMenuItem"
    ></SubMenu>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path" @click="clickMenuItem(menu)">
    <MIcon v-if="menu.icon" :name="menu.icon"></MIcon>
    <template #title>{{ menu.title }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { definePropType } from '@/utils'

defineProps({
  menu: {
    type: definePropType<UserMenu>(Object),
    default: () => {}
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
