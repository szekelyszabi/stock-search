import { APP_CONFIG } from '@/constants/config'
import type { StockQuote, StockSearchItem } from '@/types/stock'

export async function searchStocks(keywords: string): Promise<StockSearchItem[]> {
  if (!keywords || keywords.trim().length < APP_CONFIG.search.minQueryLength) {
    return []
  }

  const params = new URLSearchParams({
    keywords: keywords.trim(),
  })

  const response = await fetch(`/api/stock/search?${params}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to search stocks')
  }

  return response.json()
}

export async function getStockQuote(symbol: string): Promise<StockQuote> {
  if (!symbol || symbol.trim().length === 0) {
    throw new Error('Stock symbol is required')
  }

  const response = await fetch(`/api/stock/quote/${symbol.trim().toUpperCase()}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch stock quote')
  }

  return response.json()
}

export async function getStockHistory(
  symbol: string
): Promise<Array<{ date: string; price: number }>> {
  if (!symbol || symbol.trim().length === 0) {
    throw new Error('Stock symbol is required')
  }

  const response = await fetch(`/api/stock/history/${symbol.trim().toUpperCase()}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch stock history')
  }

  return response.json()
}