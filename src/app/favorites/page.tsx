'use client'

import Link from 'next/link'
import { useFavorites } from '@/hooks/use-favorites'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MOCK_SEARCH_RESULTS } from '@/lib/mock-data'

export default function FavoritesPage() {
  const { favorites, clearAll, isHydrated } = useFavorites()

  const favoriteStocks = MOCK_SEARCH_RESULTS.filter((stock) => favorites.includes(stock.symbol))

  return (
    <div className="px-4 py-8 sm:px-8">
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Favorites</h1>
          {isHydrated && favoriteStocks.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        {!isHydrated && <p className="text-muted-foreground">Loading...</p>}

        {isHydrated && favoriteStocks.length === 0 && (
          <p className="text-muted-foreground">
            No favorite stocks yet. Add some from the stock detail pages!
          </p>
        )}

        {isHydrated && favoriteStocks.length > 0 && (
          <div className="space-y-3">
            {favoriteStocks.map((stock) => (
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
      </main>
    </div>
  )
}
