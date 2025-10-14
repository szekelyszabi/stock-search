'use client'

import { useQuery } from '@tanstack/react-query'
import { getStockHistory } from '@/lib/stock-api'

export function useStockHistory(symbol: string) {
  return useQuery({
    queryKey: ['stock-history', symbol],
    queryFn: () => getStockHistory(symbol),
    enabled: !!symbol,
  })
}
