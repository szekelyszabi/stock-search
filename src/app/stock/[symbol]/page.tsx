import { StockDetailClient } from '@/components/stock-detail-client'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symbol: string }>
}): Promise<Metadata> {
  const { symbol } = await params

  return {
    title: `${symbol} Stock Quote | Stock Search`,
    description: `View real-time stock data, price history, and market information for ${symbol}`,
  }
}

export default async function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params

  return <StockDetailClient symbol={symbol} />
}
