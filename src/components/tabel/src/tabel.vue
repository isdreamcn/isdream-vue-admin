<template>
  <div>
    {{ props }}
    <p>MTabel</p>
  </div>
</template>

<script setup lang="ts">
import { tabelProps, tabelEmits } from './tabel'

defineOptions({
  name: 'MTabel'
})

const props = defineProps(tabelProps)
const emit = defineEmits(tabelEmits)
console.log(emit)
</script>

<style lang="scss" scoped></style>
