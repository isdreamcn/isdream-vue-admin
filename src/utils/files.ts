/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:25:20
 * @LastEditTime: 2022-09-04 23:08:20
 * @LastEditors: mtm
 */
import { isArray } from './types'

export const loadFiles = <T>(
  modules: Record<
    string,
    {
      default?: T[] | T
    }
  >
) => {
  return Object.values(modules).reduce((arr: T[], module) => {
    const _arr = module.default
    if (!_arr) {
      return arr
    }
    return arr.concat(isArray(_arr) ? _arr : [_arr])
  }, [])
}
