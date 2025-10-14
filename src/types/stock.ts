export interface StockSearchResult {
  readonly '1. symbol': string
  readonly '2. name': string
  readonly '3. type': string
  readonly '4. region': string
  readonly '5. marketOpen': string
  readonly '6. marketClose': string
  readonly '7. timezone': string
  readonly '8. currency': string
  readonly '9. matchScore': string
}

export interface StockQuote {
  readonly symbol: string
  readonly price: number
  readonly open: number
  readonly high: number
  readonly low: number
  readonly volume: number
  readonly latestTradingDay: string
  readonly previousClose: number
  readonly change: number
  readonly changePercent: number
}

export interface StockSearchItem {
  readonly symbol: string
  readonly name: string
  readonly type: string
  readonly region: string
  readonly currency: string
  readonly matchScore: number
}
