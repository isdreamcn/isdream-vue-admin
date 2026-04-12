<template>
  <div
    v-if="status"
    class="form__result"
    :class="{
      'form__result--error': status === 'error',
      'form__result--success': status === 'success'
    }"
  >
    <div class="form__result__status">
      {{ statusText }}
    </div>
    <div class="form__result__message" style="white-space: pre">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status?: 'pending' | 'success' | 'error' | null
  message?: string
}>()

const statusText = computed(() => {
  if (props.status === 'pending') return '加载中~'
  if (props.status === 'success') return '正确的！'
  if (props.status === 'error') return '错误的！'
  return ''
})
</script>

<style scoped lang="scss">
.form__result {
  color: #fff;
  background-color: #377dff;
  border-color: #377dff;
  padding: 12px;
  margin-top: 16px;
  border-radius: 6px;
  min-height: 85px;
}

.form__result__status {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 18px;
}

.form__result__message {
  margin-bottom: 16px;
}

.form__result--error {
  background-color: #ed4c78;
  border-color: #ed4c78;
}

.form__result--success {
  background-color: #00c9a7;
  border-color: #00c9a7;
}
</style>
