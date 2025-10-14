'use client'

import { useEffect, useState } from 'react'
import { APP_CONFIG } from '@/constants/config'

export function useDebounce<T>(value: T, delay: number = APP_CONFIG.search.debounceMs): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
