import { randomNum } from '../numbers'

describe('randomNum', () => {
  it('应返回指定范围内的整数', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomNum(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('当 min > max 时应自动交换', () => {
    const result = randomNum(10, 1)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })

  it('当 min === max 时应返回唯一值', () => {
    expect(randomNum(5, 5)).toBe(5)
  })
})
