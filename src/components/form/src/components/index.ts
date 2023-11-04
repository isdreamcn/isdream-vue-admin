import MSelect from './MSelect.vue'
import MCheckboxGroup from './MCheckboxGroup.vue'
import MRadioGroup from './MRadioGroup.vue'

export const formComponents = {
  MSelect,
  MCheckboxGroup,
  MRadioGroup
}

export type FormComponents = keyof typeof formComponents
