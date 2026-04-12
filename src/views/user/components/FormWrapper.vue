<template>
  <main class="form-wrapper">
    <div class="bg-img"></div>
    <div class="blank-container">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import {
  FORM_ITEM_REGISTER_KEY,
  FORM_ITEM_UNREGISTER_KEY
} from './injectionKeys'
import type { FormItemContext } from './injectionKeys'

const formItems = new Set<FormItemContext>()

const register = (instance: FormItemContext) => formItems.add(instance)
const unregister = (instance: FormItemContext) => formItems.delete(instance)

provide(FORM_ITEM_REGISTER_KEY, register)
provide(FORM_ITEM_UNREGISTER_KEY, unregister)

const validate = () => {
  return [...formItems].every(item => item.validate())
}

defineExpose({ validate })
</script>

<style scoped lang="scss">
.form-wrapper {
  font-size: 14px;
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
}

.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/bg-img.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.blank-container {
  position: relative;
  padding: 6vh 4vw 0 4vw;
}

// 表单卡片
:deep(.form) {
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  .form__header {
    margin-bottom: 32px;
  }

  .form__header__title {
    font-size: 24px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 12px;
    text-align: center;
    letter-spacing: 0.5em;
    color: #000000;
  }

  .form__header__desc {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    color: #677788;
  }

  // 链接按钮
  .form__button-link {
    color: #377dff;
    font-weight: 600;
    text-decoration: none;
    margin-left: 4px;
    cursor: pointer;

    &:hover {
      color: #1366ff;
    }
  }

  // 功能暂未开放提示
  .form__tip-unavailable {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: rgba(230, 162, 60, 0.15);
    border: 1px solid rgba(230, 162, 60, 0.3);

    &__icon {
      font-size: 18px;
      margin-right: 8px;
    }

    &__text {
      font-size: 14px;
      color: #e6a23c;
      font-weight: 500;
    }
  }
}
</style>
