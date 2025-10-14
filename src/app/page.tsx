'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useDebounce } from '@/hooks/use-debounce'
import { useStockSearch } from '@/hooks/use-stock-search'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { POPULAR_STOCKS } from '@/lib/mock-data'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedQuery = useDebounce(query)
  const { data: results, isLoading, error } = useStockSearch(debouncedQuery)

  const displayStocks = query.length >= 2 ? results : POPULAR_STOCKS
  const showPopularLabel = query.length < 2

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="px-4 py-8 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Stock Search</h1>
          <Link
            href="/favorites"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View Favorites →
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground">Search for stocks by symbol or company name</p>
        </div>

        <div className="mb-4">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search stocks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          {isLoading && query.length >= 2 && (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}

          {error && (
            <Card
              className={
                error.message.includes('rate limit') ? 'border-yellow-500' : 'border-red-500'
              }
            >
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {error.message.includes('rate limit') ? 'Rate Limit Reached' : 'Error'}
                  </h3>
                  <p className="text-sm text-muted-foreground">{error.message}</p>
                  {error.message.includes('rate limit') && (
                    <p className="text-sm text-muted-foreground">
                      The AlphaVantage API has a limit of 5 requests/minute. Please wait a moment.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {results && results.length === 0 && query.length >= 2 && (
            <p className="text-sm text-muted-foreground">No results found</p>
          )}

          {displayStocks && displayStocks.length > 0 && (
            <div className="space-y-3">
              {showPopularLabel && (
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-lg font-semibold text-muted-foreground">Popular Stocks</h2>
                  <Badge variant="secondary">Demo</Badge>
                </div>
              )}
              {displayStocks.map((stock) => (
                <Link key={stock.symbol} href={`/stock/${stock.symbol}`} className="block">
                  <Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{stock.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{stock.region}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
