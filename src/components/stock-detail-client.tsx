'use client'

import { Heart } from 'lucide-react'
import { useStockQuote } from '@/hooks/use-stock-quote'
import { useFavorites } from '@/hooks/use-favorites'
import { useStockHistory } from '@/hooks/use-stock-history'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PriceHistoryChart } from '@/components/price-history-chart'

export function StockDetailClient({ symbol }: { symbol: string }) {
  const { data: quote, error, isLoading } = useStockQuote(symbol)
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites()
  const { data: historyData } = useStockHistory(symbol)

  if (isLoading || !quote) {
    return (
      <>
          <div className="mb-8">
            <Skeleton className="h-10 w-48" />
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
      </>
    )
  }

  if (error) {
    const isRateLimit = error.message.includes('rate limit')
    return (
        <>
          <Card className={isRateLimit ? 'border-yellow-500' : 'border-red-500'}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">
                  {isRateLimit ? 'Rate Limit Reached' : 'Error'}
                </h3>
                <p className="text-sm text-muted-foreground">{error.message}</p>
                {isRateLimit && (
                  <p className="text-sm text-muted-foreground">
                    The AlphaVantage API has a limit of 25 requests/day. Please try again later.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
    )
  }

  const isPositive = quote.change >= 0

  return (
      <>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{quote.symbol}</h1>
          {isHydrated && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(quote.symbol)}
              aria-label={isFavorite(quote.symbol) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={isFavorite(quote.symbol) ? 'fill-red-500 text-red-500' : ''} />
            </Button>
          )}
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="text-3xl md:text-4xl font-bold">${quote.price.toFixed(2)}</div>
              <Badge variant={isPositive ? 'default' : 'destructive'} className="mt-2">
                {isPositive ? '+' : ''}
                {quote.change.toFixed(2)} ({isPositive ? '+' : ''}
                {quote.changePercent.toFixed(2)}%)
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">Latest: {quote.latestTradingDay}</div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Price History (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceHistoryChart data={historyData || []} symbol={quote.symbol} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Open</div>
                <div className="font-semibold">${quote.open.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Previous Close</div>
                <div className="font-semibold">${quote.previousClose.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">High</div>
                <div className="font-semibold">${quote.high.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Low</div>
                <div className="font-semibold">${quote.low.toFixed(2)}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-foreground">Volume</div>
                <div className="font-semibold">{quote.volume.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
  )
}
