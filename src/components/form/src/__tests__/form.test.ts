import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, markRaw, ref } from 'vue'
import Form from '../form.vue'
import { useFormRules } from '../hooks/useFormRules'

// Stub Element Plus 组件（测试环境中无全局注册）
const globalStubs = {
  'el-form': {
    name: 'ElForm',
    template: '<form><slot /></form>',
    methods: {
      validate(callback?: (valid: boolean) => void) {
        callback?.(true)
        return true
      },
      resetFields() {},
      clearValidate() {},
      scrollToField() {}
    }
  },
  'el-row': { template: '<div class="el-row"><slot /></div>' },
  'el-form-item': { template: '<div><slot /></div>' },
  'el-button': {
    template: '<button v-bind="$attrs"><slot /></button>'
  },
  'el-button-group': { template: '<div><slot /></div>' },
  'el-space': { template: '<div><slot /></div>' },
  MIcon: { template: '<i />' }
}

// 模拟真实字段组件（tag 均为组件，v-model 走 modelValue/update:modelValue）；
// markRaw 防止组件被 VTU 的 reactive props 深度代理（触发 Vue 警告与性能损耗）
const TestInput = markRaw({
  name: 'TestInput',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template:
    '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />'
})

const mountForm = (fields: any[], props: Record<string, any> = {}) =>
  mount(Form, {
    props: { fields, ...props },
    global: { stubs: globalStubs }
  })

// 触发提交（inline 默认按钮顺序：重置、搜索）
const triggerSubmit = async (wrapper: ReturnType<typeof mountForm>) => {
  const buttons = wrapper.findAll('button')
  await buttons[buttons.length - 1].trigger('click')
}

describe('MForm 字段动态显隐', () => {
  it('show 函数式：根据表单数据联动显隐（响应式验证）', async () => {
    const fields = [
      { tag: TestInput, key: 'type', label: '类型' },
      {
        tag: TestInput,
        key: 'extra',
        label: '扩展',
        show: (model: any) => model.type === 'B'
      }
    ]
    const wrapper = mountForm(fields)

    expect(wrapper.findAll('input').length).toBe(1)
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input').length).toBe(2)
  })

  it('静态 show: false 的字段不渲染', () => {
    const fields = [
      { tag: TestInput, key: 'a', label: 'A' },
      { tag: TestInput, key: 'b', label: 'B', show: false }
    ]
    const wrapper = mountForm(fields)
    expect(wrapper.findAll('input').length).toBe(1)
  })

  it('filter=true（默认）：字段隐藏时清除数据，重新显示为空', async () => {
    const fields = [
      { tag: TestInput, key: 'type', label: '类型' },
      {
        tag: TestInput,
        key: 'extra',
        label: '扩展',
        show: (model: any) => model.type === 'B'
      }
    ]
    const wrapper = mountForm(fields)

    await wrapper.find('input').setValue('B')
    const inputs = wrapper.findAll('input')
    await inputs[1].setValue('hello')

    await inputs[0].setValue('A')
    expect(wrapper.findAll('input').length).toBe(1)

    // 隐藏期间数据被清除，重新显示为空而非残留输入
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input')[1].element.value).toBe('')
  })

  it('初始即隐藏的回显值保留，不因隐藏清除', async () => {
    const fields = [
      { tag: TestInput, key: 'type', label: '类型' },
      {
        tag: TestInput,
        key: 'extra',
        label: '扩展',
        show: (model: any) => model.type === 'B'
      }
    ]
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '回显值' }
    })

    // extra 从未显示过：回显值保留在模型中（由 filterHidden 决定提交口径）
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input')[1].element.value).toBe('回显值')
  })
})

describe('MForm 动态 attrs', () => {
  it('attrs 函数式：跟随表单数据联动禁用', async () => {
    const fields = [
      {
        tag: TestInput,
        key: 'a',
        label: 'A',
        attrs: (model: any) => ({ disabled: model.lock === '1' })
      },
      { tag: TestInput, key: 'lock', label: '锁' }
    ]
    const wrapper = mountForm(fields)

    expect(wrapper.findAll('input')[0].attributes('disabled')).toBeUndefined()
    await wrapper.findAll('input')[1].setValue('1')
    expect(wrapper.findAll('input')[0].attributes('disabled')).toBeDefined()
  })

  it('联动更新仅重渲染读取了该数据的字段（渲染粒度）', async () => {
    // 记录每个字段组件 render 次数，验证字段级更新粒度
    const makeCountingInput = (counter: { count: number }) =>
      markRaw(
        defineComponent({
          props: { modelValue: { type: [String, Number], default: '' } },
          emits: ['update:modelValue'],
          setup(props, { emit }) {
            return () => {
              counter.count++
              return h('input', {
                value: props.modelValue,
                onInput: (e: Event) =>
                  emit(
                    'update:modelValue',
                    (e.target as HTMLInputElement).value
                  )
              })
            }
          }
        })
      )

    const driver = { count: 0 }
    const linked = { count: 0 }
    const free = { count: 0 }
    const wrapper = mountForm([
      { tag: makeCountingInput(driver), key: 'lock', label: '锁' },
      {
        tag: makeCountingInput(linked),
        key: 'a',
        label: 'A',
        attrs: (model: any) => ({ disabled: !!model.lock })
      },
      { tag: makeCountingInput(free), key: 'b', label: 'B' }
    ])
    await flushPromises()

    const before = [driver.count, linked.count, free.count]
    await wrapper.find('input').setValue('1')

    // 驱动字段自身与依赖字段联动更新
    expect(driver.count).toBeGreaterThan(before[0])
    expect(linked.count).toBeGreaterThan(before[1])
    // 未读取该数据的字段不重渲染
    expect(free.count).toBe(before[2])
  })
})

describe('MForm 提交过滤 filter / filterHidden', () => {
  const fields = [
    { tag: TestInput, key: 'type', label: '类型' },
    {
      tag: TestInput,
      key: 'extra',
      label: '扩展',
      show: (model: any) => model.type === 'B'
    }
  ]

  it('默认（filter=true + filterHidden=true）：仅回传可见字段', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值' }
    })
    await triggerSubmit(wrapper)

    const payload = wrapper.emitted('submit')![0][0] as Record<string, any>
    expect(Object.keys(payload)).toEqual(['type'])
  })

  it('filter=true：fields 之外的字段同样不回传', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7, createdAt: '2024' }
    })
    await triggerSubmit(wrapper)

    const payload = wrapper.emitted('submit')![0][0] as Record<string, any>
    expect(Object.keys(payload)).toEqual(['type'])
  })

  it('filterHidden=false：隐藏字段数据保留并回传，fields 之外的字段不回传', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 },
      filterHidden: false
    })
    await triggerSubmit(wrapper)

    const payload = wrapper.emitted('submit')![0][0] as Record<string, any>
    expect(payload).toEqual({ type: 'A', extra: '隐藏字段值' })
  })

  it('filter=false：fields 之外的字段原样带回，隐藏字段仍被 filterHidden 过滤', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7, createdAt: '2024' },
      filter: false
    })
    await triggerSubmit(wrapper)

    const payload = wrapper.emitted('submit')![0][0] as Record<string, any>
    expect(payload).toEqual({ type: 'A', id: 7, createdAt: '2024' })
  })

  it('filter=false + filterHidden=false：不过滤任何数据，全量回传', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 },
      filter: false,
      filterHidden: false
    })
    await triggerSubmit(wrapper)

    const payload = wrapper.emitted('submit')![0][0] as Record<string, any>
    expect(payload).toEqual({ type: 'A', extra: '隐藏字段值', id: 7 })
  })

  it('cancel 同样遵循提交口径裁剪', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值' }
    })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')

    const payload = wrapper.emitted('cancel')![0][0] as Record<string, any>
    expect(Object.keys(payload)).toEqual(['type'])
  })

  it('filter=false + filterHidden=false：重置时 fields 外字段与隐藏字段均恢复初始值', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 },
      filter: false,
      filterHidden: false
    })

    await wrapper.find('input').setValue('B')
    await wrapper.findAll('button')[0].trigger('click')

    const payload = wrapper.emitted('cancel')![0][0] as Record<string, any>
    expect(payload).toEqual({ type: 'A', extra: '隐藏字段值', id: 7 })
  })

  it('filterHidden=false：字段隐藏时数据保留不清除', async () => {
    const wrapper = mountForm(fields, { filterHidden: false })

    await wrapper.find('input').setValue('B')
    await wrapper.findAll('input')[1].setValue('hello')
    await wrapper.find('input').setValue('A')
    expect(wrapper.findAll('input').length).toBe(1)

    // 数据保留模式：隐藏不清数据，重新显示值仍在
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input')[1].element.value).toBe('hello')
  })
})

describe('MForm v-model 同口径', () => {
  const fields = [
    { tag: TestInput, key: 'type', label: '类型' },
    {
      tag: TestInput,
      key: 'extra',
      label: '扩展',
      show: (model: any) => model.type === 'B'
    }
  ]

  // 模拟真实 v-model 绑定（携带 update:modelValue 监听）
  const mountVModelForm = (props: Record<string, any> = {}) =>
    mount(Form, {
      props: { fields, 'onUpdate:modelValue': () => {}, ...props },
      global: { stubs: globalStubs }
    })

  const lastEmitted = (wrapper: ReturnType<typeof mountVModelForm>) => {
    const events = wrapper.emitted('update:modelValue')!
    return events[events.length - 1][0] as Record<string, any>
  }

  it('未绑定 v-model 时不回传数据', async () => {
    const wrapper = mountForm(fields, {
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 }
    })

    await wrapper.find('input').setValue('B')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('kebab-case 监听（@update:model-value）同样识别为已绑定', async () => {
    const wrapper = mount(Form, {
      props: {
        fields,
        'onUpdate:model-value': () => {},
        modelValue: { type: 'A', extra: '隐藏字段值', id: 7 }
      },
      global: { stubs: globalStubs }
    })

    const events = wrapper.emitted('update:modelValue')!
    expect(events[events.length - 1][0]).toEqual({ type: 'A' })
  })

  it('默认：update:modelValue 与 submit 同口径，仅回传可见字段', async () => {
    const wrapper = mountVModelForm({
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 }
    })
    expect(lastEmitted(wrapper)).toEqual({ type: 'A' })

    await wrapper.find('input').setValue('B')
    // type='B' 后 extra 转为可见，回显值随之纳入回传范围
    expect(lastEmitted(wrapper)).toEqual({ type: 'B', extra: '隐藏字段值' })

    await triggerSubmit(wrapper)
    expect(wrapper.emitted('submit')![0][0]).toEqual(lastEmitted(wrapper))
  })

  it('filter=false + filterHidden=false：update:modelValue 回传全量', async () => {
    const wrapper = mountVModelForm({
      modelValue: { type: 'A', extra: '隐藏字段值', id: 7 },
      filter: false,
      filterHidden: false
    })
    expect(lastEmitted(wrapper)).toEqual({
      type: 'A',
      extra: '隐藏字段值',
      id: 7
    })
  })

  it('v-model 回写裁剪版数据不污染重置基准', async () => {
    const wrapper = mountVModelForm({
      modelValue: { type: 'A', extra: '初始值' }
    })

    await wrapper.find('input').setValue('B')
    // 模拟父组件 v-model 回写（update:modelValue 回传的裁剪版数据）
    await wrapper.setProps({ modelValue: { type: 'B' } })

    // 重置仍恢复外部初始值，而非被回写污染为 'B'
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.find('input').element.value).toBe('A')
  })
})

describe('MForm 重置', () => {
  const linkageFields = [
    { tag: TestInput, key: 'type', label: '类型' },
    {
      tag: TestInput,
      key: 'extra',
      label: '扩展',
      show: (model: any) => model.type === 'B'
    }
  ]

  it('重置恢复可见字段初始值，显示过的隐藏字段数据被清除', async () => {
    const wrapper = mountForm(linkageFields, {
      modelValue: { type: 'A', extra: '初始值' }
    })

    // 显示 extra 并修改其值
    await wrapper.find('input').setValue('B')
    await wrapper.findAll('input')[1].setValue('修改后的值')

    // 重置（inline 默认按钮顺序第一个）：type 恢复初始值
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.find('input').element.value).toBe('A')

    // extra 已显示过，随隐藏被清除，重新显示为空
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input')[1].element.value).toBe('')
  })

  it('无初始值时重置清空全部字段', async () => {
    const wrapper = mountForm(linkageFields)

    await wrapper.find('input').setValue('B')
    await wrapper.findAll('input')[1].setValue('hello')
    await wrapper.findAll('button')[0].trigger('click')

    // 重置后 type 清空、extra 随之隐藏；重新显示时值也为空
    expect(wrapper.find('input').element.value).toBe('')
    await wrapper.find('input').setValue('B')
    expect(wrapper.findAll('input')[1].element.value).toBe('')
  })
})

describe('MForm 实例方法', () => {
  it('defineExpose 暴露表单方法', async () => {
    const wrapper = mountForm([{ tag: TestInput, key: 'a', label: 'A' }])
    const vm = wrapper.vm as any

    expect(typeof vm.validate).toBe('function')
    expect(typeof vm.resetFields).toBe('function')
    expect(typeof vm.scrollToField).toBe('function')
    await vm.resetFields()
  })
})

describe('MForm inline 自动折叠', () => {
  it('inline 模式渲染字段包裹容器，无换行时不显示展开按钮', () => {
    const wrapper = mountForm([{ tag: TestInput, key: 'a', label: 'A' }])

    expect(wrapper.find('.m-form__fields').exists()).toBe(true)
    expect(wrapper.find('.m-form__expand').exists()).toBe(false)
  })

  it('inline 模式按钮区与字段同一行（同容器并列，折叠时不被裁剪）', () => {
    const wrapper = mountForm([{ tag: TestInput, key: 'a', label: 'A' }])

    // 字段区与按钮区为同一 flex 容器的并列子元素，按钮区在字段区外、不受折叠裁剪
    const wrapEl = wrapper.find('.m-form__inline-wrap')
    expect(wrapEl.exists()).toBe(true)
    expect(wrapEl.find('.m-form__fields').exists()).toBe(true)
    expect(wrapEl.find('.m-form__inline-buttons').exists()).toBe(true)
    expect(
      wrapper.find('.m-form__fields + .m-form__inline-buttons').exists()
    ).toBe(true)
  })

  it('auto-collapse=false 时不启用折叠', () => {
    const wrapper = mountForm([{ tag: TestInput, key: 'a', label: 'A' }], {
      autoCollapse: false
    })
    expect(wrapper.find('.m-form__expand').exists()).toBe(false)
  })

  // 模拟两行布局：前两个字段在第一行（offsetTop 0），第三个换行（offsetTop 40）
  const mockTwoRowsLayout = (wrapper: ReturnType<typeof mountForm>) => {
    const rowEl = wrapper.element.querySelector('.el-row') as HTMLElement
    Array.from(rowEl.children).forEach((el, index) => {
      Object.defineProperty(el, 'offsetTop', { value: index > 1 ? 40 : 0 })
      Object.defineProperty(el, 'offsetHeight', { value: 30 })
    })
  }
  const threeFields = ['a', 'b', 'c'].map((key) => ({
    tag: TestInput,
    key,
    label: key.toUpperCase()
  }))

  it('字段换行时折叠到一行高度，展开后恢复', async () => {
    // 以 disabled 挂载（不折叠），mock 换行布局后解除禁用触发重新测量
    const wrapper = mountForm(threeFields, { disabled: true })
    mockTwoRowsLayout(wrapper)
    await wrapper.setProps({ disabled: false })
    await flushPromises()

    const fieldsEl = wrapper.find('.m-form__fields')
    expect(fieldsEl.classes()).toContain('is-collapsed')
    expect(fieldsEl.attributes('style')).toContain('max-height: 30px')
    expect(wrapper.find('.m-form__expand').text()).toContain('展开')
    expect(wrapper.find('.m-form__expand').classes()).not.toContain(
      'is-expanded'
    )

    // 展开/收起两态均设置具体 maxHeight（完整高度 40+30-0=70），保证过渡动画双向生效
    await wrapper.find('.m-form__expand').trigger('click')
    expect(fieldsEl.classes()).not.toContain('is-collapsed')
    expect(fieldsEl.attributes('style')).toContain('max-height: 70px')
    expect(wrapper.find('.m-form__expand').text()).toContain('收起')
    expect(wrapper.find('.m-form__expand').classes()).toContain('is-expanded')
  })

  it('disabled 时不折叠，避免字段被裁剪后无展开入口', async () => {
    const wrapper = mountForm(threeFields, { disabled: true })
    mockTwoRowsLayout(wrapper)
    await flushPromises()

    expect(wrapper.find('.m-form__fields').classes()).not.toContain(
      'is-collapsed'
    )
    expect(wrapper.find('.m-form__expand').exists()).toBe(false)
  })
})

describe('useFormRules 必填文案', () => {
  it('按组件类型生成文案，message 可覆盖', () => {
    const fields = ref([
      { tag: 'ElInput', key: 'name', label: '姓名', required: true },
      { tag: 'ElDatePicker', key: 'date', label: '日期', required: true },
      { tag: 'MTreeSelect', key: 'dept', label: '部门', required: true },
      { tag: 'MSelect', key: 'gender', label: '性别', required: true },
      { tag: 'MCheckboxGroup', key: 'tags', label: '标签', required: true },
      { tag: 'MRadioGroup', key: 'type', label: '类型', required: true },
      { tag: 'MUpload', key: 'file', label: '附件', required: true },
      {
        tag: 'ElInput',
        key: 'code',
        label: '编码',
        required: true,
        message: '请输入编码'
      },
      { tag: 'ElInput', key: 'none', label: '无' }
    ] as any)
    const { formRules } = useFormRules(fields as any)
    const rules = formRules.value as Record<string, any[]>

    expect(rules.name[0].message).toBe('请填写姓名')
    expect(rules.date[0].message).toBe('请选择日期')
    expect(rules.dept[0].message).toBe('请选择部门')
    expect(rules.gender[0].message).toBe('请选择性别')
    expect(rules.tags[0].message).toBe('请选择标签')
    expect(rules.type[0].message).toBe('请选择类型')
    expect(rules.file[0].message).toBe('请上传附件')
    expect(rules.code[0].message).toBe('请输入编码')
    expect(rules.none).toEqual([])
  })
})
