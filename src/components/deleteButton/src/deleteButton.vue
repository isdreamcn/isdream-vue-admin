<template>
  <div class="m-delete-button">
    <el-dialog
      v-bind="$attrs"
      v-model="visible"
      :title="props.title"
      :show-close="false"
      :width="550"
    >
      <span>
        {{ props.content }}
      </span>
      <template #footer>
        <el-button @click="cancel">{{ props.cancelText }}</el-button>
        <el-button type="danger" :loading="loading" @click="submit">
          {{ props.submitText }}
        </el-button>
      </template>
    </el-dialog>
    <!-- 按钮 -->
    <div class="m-delete-button__btn" role="button" @click="showDeleteDialog">
      <slot :disabled="props.disabled" :loading="loading">
        <el-button :disabled="props.disabled" :loading="loading" type="danger">
          <MIcon name="icon-delete"></MIcon>
          批量删除
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deleteButtonProps, deleteButtonEmits } from './deleteButton'

defineOptions({
  name: 'MDeleteButton',
  inheritAttrs: false
})

const props = defineProps(deleteButtonProps)
const emit = defineEmits(deleteButtonEmits)

const visible = ref(false)
const loading = ref(false)
const showDeleteDialog = () => {
  if (loading.value || props.disabled) {
    return
  }

  if (!props.selectKeys.length) {
    ElMessage({
      message: '请选择需要删除的数据',
      type: 'warning'
    })
    return
  }
  visible.value = true
}

const cancel = () => {
  visible.value = false
  loading.value = false
}

const submit = () => {
  loading.value = true
  if (!props.http) {
    emit('click')
    cancel()
    return
  }

  let request = null
  if (!props.httpLoop) {
    request = props.http(props.handler(props.selectKeys))
  } else {
    request = Promise.all(
      props.selectKeys.map((id) => props.http?.(props.handler(id)))
    )
  }

  request
    .then(() => {
      ElMessage({
        message: props.message,
        type: 'success'
      })
      cancel()
      emit('reload')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.m-delete-button {
  display: inline-block;
  &__btn {
    .m-icon {
      margin-right: 5px;
    }
  }
}
</style>
