<template>
  <span class="m-a">
    <el-popconfirm
      v-if="hasPop"
      :title="props.popTitle"
      :confirm-button-text="props.submitText"
      :cancel-button-text="props.cancelText"
      :confirm-button-type="props.type"
      @confirm="confirm"
    >
      <template #reference>
        <el-button v-bind="$attrs" link :type="props.type">
          <slot>删除</slot>
        </el-button>
      </template>
    </el-popconfirm>
    <el-button v-else v-bind="$attrs" link :type="props.type" @click="confirm">
      <slot>删除</slot>
    </el-button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { aProps, aEmits } from './a'

defineOptions({
  name: 'MA'
})

const hasPop = computed(
  () => props.pop || (props.type === 'danger' && props.pop !== false)
)

const props = defineProps(aProps)
const emit = defineEmits(aEmits)

const confirm = (evt: Event) => {
  emit('click', evt)
}
</script>

<style lang="scss" scoped>
.m-a {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
