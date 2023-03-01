<template>
  <div class="m-upload">
    <el-upload
      v-bind="$attrs"
      :multiple="props.multiple"
      :accept="props.accept"
      :list-type="props.listType"
      :disabled="disabled"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <slot :disabled="disabled">
        <el-button
          v-if="props.listType !== 'picture-card'"
          :disabled="disabled"
          type="primary"
          >点击上传</el-button
        >
        <m-icon v-else name="icon-plus"></m-icon>
      </slot>
      <template #tip>
        <slot name="tip"></slot>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import type { UploadUserFile, UploadRule } from './upload'
import { uploadProps, uploadEmits } from './upload'
import { ref, watch, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { api as viewerApi } from 'v-viewer'
import { useProgressFake } from './hooks'
import { cloneDeep, joinBaseUrlFile } from '@/utils'

defineOptions({
  name: 'MUpload',
  inheritAttrs: false
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const fileList = ref<UploadUserFile[]>([])

watch(
  () => props.modelValue,
  (val) => {
    if (fileList.value === val) {
      return
    }
    const modelValue = cloneDeep(val)
    fileList.value = modelValue.map((item) => ({
      ...item,
      url: joinBaseUrlFile(item.url),
      response: {
        filename: item.name,
        url: item.url,
        ...item.response
      }
    }))
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => fileList.value,
  (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  },
  {
    immediate: true
  }
)

const onPreview: UploadProps['onPreview'] = (uploadFile) => {
  if (!props.preview) {
    return
  }

  // onPreview
  if (props.preview !== true) {
    props.preview(uploadFile)
    return
  }

  const initialViewIndex = fileList.value.findIndex(
    (file) => file.uid === uploadFile.uid
  )
  viewerApi({
    // TODO: https://github.com/fengyuanchen/viewerjs
    options: {
      toolbar: true,
      url: 'url',
      initialViewIndex
    },
    images: fileList.value
  })
}

const onRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  fileList.value = uploadFiles as UploadUserFile[]
}

const isMax = computed(() => fileList.value.length >= props.max)
const disabled = computed(() => props.disabled)

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const rules: UploadRule[] = [
    {
      validator: () => isMax.value,
      message: `最多上传${props.max}个文件`
    },
    {
      validator: (file) => {
        if (props.accept === 'all') {
          return false
        }
        const fileType = file.type.split('/')[1]
        return !props.accept.includes(fileType)
      },
      message: '文件格式不符合要求'
    },
    {
      validator: (file) => file.size > props.maxSize,
      message: `文件不能超过${props.maxSize}byte`
    },
    ...props.rules
  ]

  const rule = rules.find((rule) => rule.validator(rawFile))
  if (rule) {
    ElMessage.warning(rule.message)
    return false
  }
}

const onChange = () => {
  if (props.removeFail) {
    fileList.value = fileList.value.filter((file) => file.status !== 'fail')
  } else {
    fileList.value = [...fileList.value]
  }
}

const httpRequest: UploadProps['httpRequest'] = (options) => {
  const { file } = options
  // 当前文件信息
  const fileListItem = reactive<UploadUserFile>({
    name: file.name,
    url: URL.createObjectURL(file),
    status: 'uploading',
    percentage: 0
  })

  fileList.value.push(fileListItem)

  // 进度条
  const { cancel } = useProgressFake(
    (percent) => {
      fileListItem.percentage = percent
    },
    {
      interval: 100,
      maxNum: 99,
      increaseNum: 3
    }
  )

  // 请求上传接口
  const formdata = new FormData()
  formdata.append(props.httpFileKey, file)

  return props
    .http(formdata)
    .then(({ data }) => {
      fileListItem.name = data.filename
      fileListItem.url = joinBaseUrlFile(data.url)
      fileListItem.status = 'success'
      fileListItem.response = data
      if (props.showMessage) {
        ElMessage.success('上传成功')
      }
    })
    .catch(() => {
      fileListItem.status = 'fail'
      if (props.showMessage) {
        ElMessage.error('上传失败')
      }
    })
    .finally(cancel)
}
</script>

<style lang="scss" scoped>
.m-upload {
  width: 100%;
}
</style>
