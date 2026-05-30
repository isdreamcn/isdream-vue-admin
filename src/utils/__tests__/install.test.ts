import {
  withInstall,
  withInstallFunction,
  withInstallDirective,
  withNoopInstall
} from '../install'

describe('withInstall', () => {
  it('给组件添加 install 方法', () => {
    const component = { name: 'MyButton' }
    const result = withInstall(component)
    expect(typeof result.install).toBe('function')
  })

  it('install 注册组件到 app', () => {
    const component = { name: 'MyButton' }
    const result = withInstall(component)
    const app = { component: vi.fn() }
    result.install!(app as any)
    expect(app.component).toHaveBeenCalledWith('MyButton', component)
  })

  it('mainName 参数覆盖组件 name', () => {
    const component = { name: 'InternalName' }
    const result = withInstall(component, undefined, 'PublicName')
    const app = { component: vi.fn() }
    result.install!(app as any)
    expect(app.component).toHaveBeenCalledWith('PublicName', component)
  })

  it('extra 参数注册额外组件', () => {
    const main = { name: 'Main' }
    const extra = { Sub: { name: 'Sub' } }
    const result = withInstall(main, extra)
    const app = { component: vi.fn() }
    result.install!(app as any)
    expect(app.component).toHaveBeenCalledWith('Sub', { name: 'Sub' })
  })

  it('extra 参数挂载到 main 上', () => {
    const main = { name: 'Main' }
    const extra = { Sub: { name: 'Sub' } }
    const result = withInstall(main, extra)
    expect((result as any).Sub).toEqual({ name: 'Sub' })
  })

  it('DEV 模式无 name 时触发 console.warn', () => {
    vi.stubEnv('DEV', true)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const component = {}
    const result = withInstall(component)
    const app = { component: vi.fn() }
    result.install!(app as any)
    expect(warnSpy).toHaveBeenCalledWith(
      '[withInstall] Component name is required for registration'
    )
  })

  it('PROD 模式无 name 时不触发 console.warn', () => {
    vi.stubEnv('DEV', false)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const component = {}
    const result = withInstall(component)
    const app = { component: vi.fn() }
    result.install!(app as any)
    expect(warnSpy).not.toHaveBeenCalled()
  })
})

describe('withInstallFunction', () => {
  it('给函数添加 install 方法', () => {
    const fn = () => {}
    const result = withInstallFunction(fn, '$myFn')
    expect(typeof result.install).toBe('function')
  })

  it('install 将函数注册到 globalProperties', () => {
    const fn = () => {}
    const result = withInstallFunction(fn, '$myFn')
    const app = {
      _context: {},
      config: { globalProperties: {} as Record<string, any> }
    }
    result.install!(app as any)
    expect(app.config.globalProperties.$myFn).toBe(fn)
  })

  it('install 保存 app._context 到 fn._context', () => {
    const fn = () => {}
    const result = withInstallFunction(fn, '$myFn')
    const ctx = {}
    const app = {
      _context: ctx,
      config: { globalProperties: {} as Record<string, any> }
    }
    result.install!(app as any)
    expect(result._context).toBe(ctx)
  })
})

describe('withInstallDirective', () => {
  it('给指令添加 install 方法', () => {
    const directive = { mounted: vi.fn() }
    const result = withInstallDirective(directive, 'myDirective')
    expect(typeof result.install).toBe('function')
  })

  it('install 注册指令到 app', () => {
    const directive = { mounted: vi.fn() }
    const result = withInstallDirective(directive, 'myDirective')
    const app = { directive: vi.fn() }
    result.install!(app as any)
    expect(app.directive).toHaveBeenCalledWith('myDirective', directive)
  })
})

describe('withNoopInstall', () => {
  it('给组件添加 NOOP install', () => {
    const component = { name: 'Dummy' }
    const result = withNoopInstall(component)
    expect(typeof result.install).toBe('function')
  })

  it('install 是空操作', () => {
    const component = { name: 'Dummy' }
    const result = withNoopInstall(component)
    expect(result.install!({} as any)).toBeUndefined()
  })
})
