import { flushPromises, mount } from '@vue/test-utils'
import Button from '../button.vue'

const { messageBoxMock, messageWarningMock } = vi.hoisted(() => ({
  messageBoxMock: vi.fn(),
  messageWarningMock: vi.fn()
}))

vi.mock('element-plus', async (importOriginal) => {
  const actual = await importOriginal<typeof import('element-plus')>()
  return {
    ...actual,
    ElMessageBox: messageBoxMock,
    ElMessage: { warning: messageWarningMock }
  }
})

// Stub Element Plus 组件（测试环境中无 auto-import / 全局注册）
const globalStubs = {
  'el-button': {
    props: ['loading', 'type'],
    template:
      '<button :data-loading="loading ? \'true\' : \'false\'" :data-type="type" v-bind="$attrs"><slot /></button>'
  },
  'el-tooltip': {
    props: ['content', 'disabled'],
    template:
      '<div class="el-tooltip-stub" :data-content="content" :data-disabled="String(disabled)"><slot /></div>'
  }
}

const mountButton = (options: Parameters<typeof mount>[1] = {}) =>
  mount(Button, { global: { stubs: globalStubs }, ...options })

beforeEach(() => {
  messageBoxMock.mockReset()
  messageWarningMock.mockReset()
  messageBoxMock.mockResolvedValue('confirm')
})

describe('MButton', () => {
  it('默认渲染 primary 类型与插槽内容', () => {
    const wrapper = mountButton({ slots: { default: '保存' } })
    expect(wrapper.find('button').attributes('data-type')).toBe('primary')
    expect(wrapper.text()).toContain('保存')
  })

  it('属性透传至 el-button（type/link 覆盖默认值）', () => {
    const wrapper = mountButton({
      props: { type: 'success' },
      attrs: { link: true }
    })
    expect(wrapper.find('button').attributes('data-type')).toBe('success')
    expect(wrapper.find('button').attributes('link')).toBe('true')
  })

  it('未传 http 时点击触发 click 事件', async () => {
    const wrapper = mountButton()
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('http 模式：点击执行 http 并管理 loading，不触发 click', async () => {
    let resolveHttp!: () => void
    const http = vi.fn(
      () => new Promise<void>((resolve) => (resolveHttp = resolve))
    )
    const wrapper = mountButton({ props: { http } })

    await wrapper.find('button').trigger('click')
    expect(http).toHaveBeenCalledTimes(1)
    expect(wrapper.find('button').attributes('data-loading')).toBe('true')
    expect(wrapper.emitted('click')).toBeUndefined()

    resolveHttp()
    await flushPromises()
    expect(wrapper.find('button').attributes('data-loading')).toBe('false')
  })

  it('外部 loading 属性与内部 http loading 取或', () => {
    const wrapper = mountButton({ props: { loading: true } })
    expect(wrapper.find('button').attributes('data-loading')).toBe('true')
  })

  it('http 失败后 loading 复位并触发 error 事件', async () => {
    const error = new Error('fail')
    const http = vi.fn(() => Promise.reject(error))
    const wrapper = mountButton({ props: { http } })
    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.find('button').attributes('data-loading')).toBe('false')
    expect(wrapper.emitted('error')).toHaveLength(1)
    expect(wrapper.emitted('error')![0]).toEqual([error])
  })

  it('danger 类型默认弹出二次确认，确认后执行 http', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({ props: { type: 'danger', http } })

    await wrapper.find('button').trigger('click')
    expect(messageBoxMock).toHaveBeenCalledTimes(1)
    expect(messageBoxMock.mock.calls[0][0]).toMatchObject({
      title: '提示',
      message: '确定执行操作吗？'
    })

    await flushPromises()
    expect(http).toHaveBeenCalledTimes(1)
  })

  it('确认弹窗取消时触发 cancel 且不执行 http', async () => {
    messageBoxMock.mockRejectedValue('cancel')
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({ props: { type: 'danger', http } })

    await wrapper.find('button').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(http).not.toHaveBeenCalled()
  })

  it('pop=null 强制关闭二次确认', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({
      props: { type: 'danger', pop: null, http }
    })

    await wrapper.find('button').trigger('click')
    expect(messageBoxMock).not.toHaveBeenCalled()
    expect(http).toHaveBeenCalledTimes(1)
  })

  it('pop=true 对非 danger/warning 类型显式开启确认', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({ props: { pop: true, http } })

    await wrapper.find('button').trigger('click')
    expect(messageBoxMock).toHaveBeenCalledTimes(1)
    await flushPromises()
    expect(http).toHaveBeenCalledTimes(1)
  })

  it('自定义确认文案通过 message 传入', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({
      props: { type: 'danger', message: '确认删除吗？', http }
    })

    await wrapper.find('button').trigger('click')
    expect(messageBoxMock.mock.calls[0][0]).toMatchObject({
      message: '确认删除吗？'
    })
  })

  it('messageBoxProps 透传至确认弹窗', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({
      props: { type: 'danger', messageBoxProps: { title: '自定义标题' }, http }
    })

    await wrapper.find('button').trigger('click')
    expect(messageBoxMock.mock.calls[0][0]).toMatchObject({
      title: '自定义标题'
    })
  })

  it('disabledTip：disabled 不透传、保持置灰外观、点击弹提示且不执行', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({
      props: { http, disabledTip: '请选择数据' },
      attrs: { disabled: true }
    })

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('button').classes()).toContain('is-disabled')

    await wrapper.find('button').trigger('click')
    expect(messageWarningMock).toHaveBeenCalledWith('请选择数据')
    expect(http).not.toHaveBeenCalled()
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disabledTip 模式下未 disabled 时正常执行 http', async () => {
    const http = vi.fn().mockResolvedValue(undefined)
    const wrapper = mountButton({ props: { http, disabledTip: '请选择数据' } })

    await wrapper.find('button').trigger('click')
    expect(http).toHaveBeenCalledTimes(1)
    expect(messageWarningMock).not.toHaveBeenCalled()
  })

  it('tooltip 透传至 el-tooltip', () => {
    const withTip = mountButton({ props: { tooltip: '一段提示' } })
    expect(withTip.find('.el-tooltip-stub').attributes('data-content')).toBe(
      '一段提示'
    )

    const withoutTip = mountButton()
    expect(
      withoutTip.find('.el-tooltip-stub').attributes('data-disabled')
    ).toBe('true')
  })

  it('tooltipProps 透传至 el-tooltip', () => {
    const wrapper = mountButton({
      props: { tooltipProps: { placement: 'top' } }
    })
    expect(wrapper.find('.el-tooltip-stub').attributes('placement')).toBe(
      'top'
    )
  })
})
