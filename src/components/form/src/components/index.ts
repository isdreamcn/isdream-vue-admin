import type { Component } from 'vue'
import MSelect from './MSelect.vue'
import MCheckboxGroup from './MCheckboxGroup.vue'
import MRadioGroup from './MRadioGroup.vue'

export type FormComponents = 'MSelect' | 'MCheckboxGroup' | 'MRadioGroup'

export const formComponents: Record<FormComponents, Component> = {
  MSelect,
  MCheckboxGroup,
  MRadioGroup
}

export const formComponentMap = new Map<FormComponents, Component>()
for (const key of Object.keys(formComponents) as FormComponents[]) {
  formComponentMap.set(key, formComponents[key])
}
