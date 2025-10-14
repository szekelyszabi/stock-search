import { NextRequest, NextResponse } from 'next/server'
import type { StockSearchItem, StockSearchResult } from '@/types/stock'
import { APP_CONFIG } from '@/constants/config'

const BASE_URL = 'https://www.alphavantage.co/query'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const keywords = searchParams.get('keywords')

    if (!keywords || keywords.trim().length < APP_CONFIG.search.minQueryLength) {
      return NextResponse.json([])
    }

    const apiKey = process.env.ALPHAVANTAGE_API_KEY

    if (!apiKey) {
      throw new Error('ALPHAVANTAGE_API_KEY is required')
    }

    const params = new URLSearchParams({
      function: 'SYMBOL_SEARCH',
      keywords: keywords.trim(),
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${params}`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // AlphaVantage error handling
    if (data['Error Message']) {
      throw new Error(data['Error Message'])
    }

    if (data['Note']) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    if (data['Information']) {
      throw new Error(data['Information'])
    }

    const bestMatches = data.bestMatches || []

    const mappedResults: StockSearchItem[] = bestMatches.map((match: StockSearchResult) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency'],
      matchScore: parseFloat(match['9. matchScore']),
    }))

    const results = mappedResults.filter(
      (stock: StockSearchItem) => stock.name && stock.name !== 'null'
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error('Stock search error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
