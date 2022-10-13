<template>
  <div>
    <el-dialog
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
    <el-button
      :disabled="props.disabled"
      :type="props.type"
      @click="showDeleteDialog"
    >
      <MIcon v-if="props.icon" :name="props.icon"></MIcon>
      <slot>批量删除</slot>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { deleteButtonProps, deleteButtonEmits } from './deleteButton'

defineOptions({
  name: 'MDeleteButton'
})

const props = defineProps(deleteButtonProps)
const emit = defineEmits(deleteButtonEmits)

const visible = ref(false)
const loading = ref(false)
const showDeleteDialog = () => {
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
}

const submit = () => {
  loading.value = true
  if (!props.http) {
    emit('click')
    cancel()
    return
  }

  let request = null
  if (props.httpKey) {
    request = props.http(props.handler({ [props.httpKey]: props.selectKeys }))
  } else {
    const data = props.handler({})
    request = Promise.all(props.selectKeys.map((id) => props.http!(id, data)))
  }

  request!
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
.m-icon {
  margin-right: 5px;
}
</style>
