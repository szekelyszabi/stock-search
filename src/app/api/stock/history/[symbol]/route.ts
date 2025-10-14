import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://www.alphavantage.co/query'

interface TimeSeriesData {
  [date: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. volume': string
  }
}

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
      function: 'TIME_SERIES_DAILY',
      symbol: symbol.trim().toUpperCase(),
      apikey: apiKey,
    })

    const response = await fetch(`${BASE_URL}?${searchParams}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

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

    const timeSeries: TimeSeriesData = data['Time Series (Daily)']

    if (!timeSeries) {
      return NextResponse.json(
        { error: `No historical data found for symbol: ${symbol}` },
        { status: 404 }
      )
    }

    // Get last 30 days of data
    const history = Object.entries(timeSeries)
      .slice(0, 30)
      .reverse()
      .map(([date, values]) => ({
        date,
        price: parseFloat(values['4. close']),
      }))

    return NextResponse.json(history)
  } catch (error) {
    console.error('Stock history error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
