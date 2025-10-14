import { NextRequest, NextResponse } from 'next/server'
import type { StockQuote } from '@/types/stock'

const BASE_URL = 'https://www.alphavantage.co/query'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params

    if (!symbol || symbol.trim().length === 0) {
      return NextResponse.json({ error: 'Stock symbol is required' }, { status: 400 })
    }

    const apiKey = process.env.ALPHAVANTAGE_API_KEY

    if (!apiKey) {
      throw new Error('ALPHAVANTAGE_API_KEY is required')
    }

    const searchParams = new URLSearchParams({
      function: 'GLOBAL_QUOTE',
      symbol: symbol.trim().toUpperCase(),
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${searchParams}`, {
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

    const globalQuote = data['Global Quote']

    if (!globalQuote || Object.keys(globalQuote).length === 0) {
      return NextResponse.json({ error: `No data found for symbol: ${symbol}` }, { status: 404 })
    }

    // AlphaVantage returns numbers as strings, parse for calculations
    const quote: StockQuote = {
      symbol: globalQuote['01. symbol'],
      price: parseFloat(globalQuote['05. price']),
      open: parseFloat(globalQuote['02. open']),
      high: parseFloat(globalQuote['03. high']),
      low: parseFloat(globalQuote['04. low']),
      volume: parseInt(globalQuote['06. volume'], 10),
      latestTradingDay: globalQuote['07. latest trading day'],
      previousClose: parseFloat(globalQuote['08. previous close']),
      change: parseFloat(globalQuote['09. change']),
      changePercent: parseFloat(globalQuote['10. change percent'].replace('%', '')),
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Stock quote error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
