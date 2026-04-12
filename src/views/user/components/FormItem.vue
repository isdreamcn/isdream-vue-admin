<template>
  <div
    class="form__item"
    :class="{
      'form__item--error': status === 'error',
      'form__item--success': status === 'success'
    }"
  >
    <label class="form__item__label">
      {{ label }}
      <slot name="label-extra"></slot>
    </label>
    <div v-if="$slots.captcha" class="form__item__captcha">
      <input
        v-model="value"
        class="form__item__input"
        :type="type"
        :placeholder="placeholder"
        autocomplete="off"
      />
      <div class="captcha-box">
        <slot name="captcha"></slot>
      </div>
    </div>
    <input
      v-else
      v-model="value"
      class="form__item__input"
      :type="type"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <span class="form__item__tip">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import {
  FORM_ITEM_REGISTER_KEY,
  FORM_ITEM_UNREGISTER_KEY
} from './injectionKeys'

const props = defineProps<{
  label: string
  modelValue?: string
  type?: string
  placeholder?: string
  rules?: ((val: string) => string | false | undefined)[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const error = ref('')
const status = ref<'' | 'success' | 'error'>('')

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emit('update:modelValue', val)
    validate(val)
  }
})

const validate = (val?: string) => {
  if (!props.rules?.length) return true
  for (const rule of props.rules) {
    const msg = rule(val || '')
    if (msg) {
      error.value = msg
      status.value = 'error'
      return false
    }
  }
  error.value = ''
  status.value = 'success'
  return true
}

const register = inject(FORM_ITEM_REGISTER_KEY, () => {})
const unregister = inject(FORM_ITEM_UNREGISTER_KEY, () => {})

const self = {
  validate: () => validate(props.modelValue)
}

onMounted(() => register(self))
onUnmounted(() => unregister(self))
</script>

<style scoped lang="scss">
.form__item {
  margin-bottom: 24px;
}

.form__item__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #1e2022;
}

.form__item__input {
  padding: 14px 16px;
  border-radius: 4px;
  width: 100%;
  color: #1e2022;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(231, 234, 243, 0.7);
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:focus {
    color: #1e2022;
    background-color: #fff;
    border-color: rgba(140, 152, 164, 0.25);
    outline: 0;
    box-shadow: 0 0 1rem 0 rgba(140, 152, 164, 0.25);
  }
}

.form__item__tip {
  width: 100%;
  margin-top: 4px;
  color: #ed4c78;
  display: none;
}

// 验证码
.form__item__captcha {
  position: relative;

  .form__item__input {
    padding-right: 136px;
  }

  .captcha-box {
    position: absolute;
    width: 120px;
    height: 100%;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 校验错误
.form__item--error {
  .form__item__input {
    border-color: #ed4c78;

    &:focus {
      border-color: #ed4c78;
      box-shadow: 0 0 1rem 0 rgba(237, 76, 120, 0.25);
    }
  }

  .form__item__tip {
    display: block;
  }
}

// 校验成功
.form__item--success {
  .form__item__input {
    border-color: #00c9a7;

    &:focus {
      border-color: #00c9a7;
      box-shadow: 0 0 1rem 0 rgba(0, 201, 167, 0.25);
    }
  }
}
</style>
