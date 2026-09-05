interface UseProgressFakeOptions {
  /** 进度上限，达到后自动停止，默认 100 */
  maxNum?: number
  /** 定时器间隔（毫秒） */
  interval: number
  /** 每次递增的数值，默认 1 */
  increaseNum?: number
}

type UseProgressFakeCallback = (number: number) => void

/**
 * 假进度条：按 interval 周期递增数值并回调，达到 maxNum 后自动停止，
 * 适用于上传等无法获取真实进度的场景
 */
export const useProgressFake = (
  callback: UseProgressFakeCallback,
  options: UseProgressFakeOptions
) => {
  const { maxNum = 100, interval, increaseNum = 1 } = options

  let currNum = 0
  let timer: ReturnType<typeof setInterval> | null = setInterval(() => {
    currNum += increaseNum
    if (currNum >= maxNum) {
      currNum = maxNum
      clearInterval(timer!)
      timer = null
    }
    callback(currNum)
  }, interval)

  const cancel = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  return {
    cancel
  }
}
