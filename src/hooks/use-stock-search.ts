'use client'

import { useQuery } from '@tanstack/react-query'
import { searchStocks } from '@/lib/stock-api'
import type { StockSearchItem } from '@/types/stock'
import { APP_CONFIG } from '@/constants/config'

export function useStockSearch(query: string) {
  return useQuery<StockSearchItem[], Error>({
    queryKey: ['stock-search', query],
    queryFn: () => searchStocks(query),
    enabled: query.length >= APP_CONFIG.search.minQueryLength,
  })
}
