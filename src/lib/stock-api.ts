import { APP_CONFIG } from '@/constants/config'
import type { StockQuote, StockSearchItem } from '@/types/stock'
import { MOCK_SEARCH_RESULTS, MOCK_QUOTES } from './mock-data'

export async function searchStocks(keywords: string): Promise<StockSearchItem[]> {
  if (!keywords || keywords.trim().length < APP_CONFIG.search.minQueryLength) {
    return []
  }

  await new Promise((resolve) => setTimeout(resolve, 100))

  const query = keywords.trim().toLowerCase()
  return MOCK_SEARCH_RESULTS.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query) || stock.name.toLowerCase().includes(query)
  )
}

export async function getStockQuote(symbol: string): Promise<StockQuote> {
  if (!symbol || symbol.trim().length === 0) {
    throw new Error('Stock symbol is required')
  }

  await new Promise((resolve) => setTimeout(resolve, 100))

  const upperSymbol = symbol.trim().toUpperCase()
  const quote = MOCK_QUOTES[upperSymbol]

  if (!quote) {
    throw new Error(`No data found for symbol: ${symbol}`)
  }

  return quote
}
