'use client'

import { useQuery } from '@tanstack/react-query'
import { getStockQuote } from '@/lib/stock-api'
import type { StockQuote } from '@/types/stock'

export function useStockQuote(symbol: string) {
  return useQuery<StockQuote, Error>({
    queryKey: ['stock-quote', symbol],
    queryFn: () => getStockQuote(symbol),
    enabled: symbol.length > 0,
  })
}
