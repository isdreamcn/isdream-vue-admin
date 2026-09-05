/** 生成 [min, max] 闭区间随机整数，min 大于 max 时自动交换 */
export const randomNum = (min: number, max: number) => {
  if (min > max) {
    ;[min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}
