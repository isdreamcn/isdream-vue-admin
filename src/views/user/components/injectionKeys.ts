import type { InjectionKey } from 'vue'

export interface FormItemContext {
  validate: () => boolean
}

export const FORM_ITEM_REGISTER_KEY: InjectionKey<
  (instance: FormItemContext) => void
> = Symbol('formItemRegister')

export const FORM_ITEM_UNREGISTER_KEY: InjectionKey<
  (instance: FormItemContext) => void
> = Symbol('formItemUnregister')
