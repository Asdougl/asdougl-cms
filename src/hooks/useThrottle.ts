import { useCallback } from 'react'
import throttle from 'lodash/throttle'

export const useThrottle = <T>(callback: (arg: T) => void, timer: number) => {
  return useCallback(throttle(callback, timer), [callback])
}
