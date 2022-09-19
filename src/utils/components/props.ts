import type { PropType } from 'vue'
import type { NativePropType, PropInput, Prop } from './types'
import { warn } from 'vue'
import { fromPairs } from 'lodash-unified'
import { hasOwn } from '../objects'
import { isObject } from '../types'

export const definePropType = <T>(val: any): PropType<T> => val

export const buildProp = <Type = never>(
  prop: PropInput<Type>,
  key?: string
): Prop<Type> => {
  if (!isObject(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const _prop: any = {
    type,
    required: !!required,
    validator: _validator
  }
  if (hasOwn(prop, 'default')) _prop.default = defaultValue
  return _prop
}

export const buildProps = <
  Props extends Record<string, NativePropType | PropInput<any>>
>(
  props: Props
): Props =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key)
    ])
  ) as any
