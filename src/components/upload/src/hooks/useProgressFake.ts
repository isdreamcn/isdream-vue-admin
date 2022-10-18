interface UseProgressFakeOptions {
  maxNum?: number
  interval: number
  increaseNum?: number
}

type UseProgressFakeCallback = (number: number) => void

export const useProgressFake = (
  callback: UseProgressFakeCallback,
  options: UseProgressFakeOptions
) => {
  const { maxNum = 100, interval, increaseNum = 1 } = options

  let currNum = 0
  let timer: NodeJS.Timeout | null = setInterval(() => {
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
