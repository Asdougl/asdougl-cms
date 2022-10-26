import type { EffectCallback } from 'react'
import { useEffect, useRef } from 'react'

export const useMount = (callback: EffectCallback) => {
  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current === false) {
      mounted.current = true
      return callback()
    }
  }, [])
}
