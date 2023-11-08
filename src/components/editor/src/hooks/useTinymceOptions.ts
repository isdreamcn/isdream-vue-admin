import type { EditorProps } from '../editor'
import type { Editor, RawEditorSettings } from 'tinymce'
import { computed, ref } from 'vue'
import { uniqueId } from '@/utils'
import { useAppSetting } from '@/store'

export const useTinymceOptions = (
  props: EditorProps,
  options: Record<string, any> = {},
  setup: (editor: Editor) => void = () => {}
) => {
  const { appTheme } = useAppSetting()

  const skinName = computed(() =>
    appTheme.value === 'light' ? 'oxide' : 'oxide-dark'
  )

  const tinymceId = ref<string>(uniqueId('tinymce-'))

  const tinymceOptions = computed((): RawEditorSettings => {
    const { height, toolbar, plugins } = props
    const publicPath = import.meta.env.VITE_PUBLIC_PATH
    return {
      selector: `#${tinymceId.value}`,
      height,
      toolbar,
      menubar: 'file edit insert view format table',
      plugins,
      language_url: publicPath + 'tinymce/langs/zh_CN.js',
      language: 'zh_CN',
      branding: false,
      default_link_target: '_blank',
      link_title: false,
      // 允许图像、表格或媒体对象的大小调整
      object_resizing: true,
      auto_focus: true,
      skin: skinName.value,
      skin_url: publicPath + 'tinymce/skins/ui/' + skinName.value,
      content_css:
        publicPath + 'tinymce/skins/ui/' + skinName.value + '/content.min.css',
      ...options,
      ...props.options,
      setup
    }
  })

  return {
    tinymceOptions,
    tinymceId,
    skinName
  }
}
