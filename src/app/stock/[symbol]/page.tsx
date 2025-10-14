import { StockDetailClient } from '@/components/stock-detail-client'
import type { Metadata } from 'next'
import Link from 'next/link'

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

  return (
    <div className="px-4 py-8 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground items-center gap-1 mb-4 inline-flex"
        >
          ← Back to search
        </Link>
        <StockDetailClient symbol={symbol} />
      </main>
    </div>
  )
}
