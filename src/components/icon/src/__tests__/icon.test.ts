import { mount } from '@vue/test-utils'
import Icon from '../icon.vue'

// Stub Element Plus 组件（测试环境中无 auto-import）
const globalStubs = {
  'el-icon': {
    template:
      '<div class="mock-el-icon" :size="size" :color="color"><slot /></div>',
    props: ['size', 'color']
  }
}

// 非 iconfont 模式下组件尝试渲染 <component :is="name">，
// 但测试环境无图标组件注册，抑制 Vue 的 unresolved component 警告
beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})
describe('MIcon', () => {
  it('使用必需的 name prop 渲染', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon-edit' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find('.mock-el-icon').exists()).toBe(true)
  })

  it('支持 size 和 color props', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon-edit', size: 24, color: 'red' },
      global: { stubs: globalStubs }
    })
    const elIcon = wrapper.find('.mock-el-icon')
    expect(elIcon.exists()).toBe(true)
    expect(elIcon.attributes('size')).toBe('24')
    expect(elIcon.attributes('color')).toBe('red')
  })

  it('name 以 "iconfont" 开头时应用 iconfont class', () => {
    const wrapper = mount(Icon, {
      props: { name: 'iconfont-arrow' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find('.iconfont').exists()).toBe(true)
    expect(wrapper.find('.icon-arrow').exists()).toBe(true)
  })

  it('name 以 "Iconfont" 开头时应用 iconfont class', () => {
    const wrapper = mount(Icon, {
      props: { name: 'Iconfont-arrow' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find('.iconfont').exists()).toBe(true)
    expect(wrapper.find('.icon-arrow').exists()).toBe(true)
  })

  it('普通 icon name 不应用 iconfont class', () => {
    const wrapper = mount(Icon, {
      props: { name: 'icon-edit' },
      global: { stubs: globalStubs }
    })
    expect(wrapper.find('.iconfont').exists()).toBe(false)
  })
})
