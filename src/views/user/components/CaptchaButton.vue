<template>
  <a class="form__button-link" @click.prevent="onClick">
    <span v-if="countdown">{{ countdown }}s</span>
    <slot v-else>获取验证码</slot>
  </a>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    seconds?: number
  }>(),
  { seconds: 60 }
)

const emit = defineEmits<{
  click: []
}>()

const countdown = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const clearTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const onClick = () => {
  if (countdown.value) return
  emit('click')
  clearTimer()
  countdown.value = props.seconds
  timer = setInterval(() => {
    countdown.value--
    if (!countdown.value) {
      clearTimer()
    }
  }, 1000)
}

onUnmounted(clearTimer)
</script>
