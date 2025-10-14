import type { StockSearchItem, StockQuote } from "@/types/stock";

export const MOCK_SEARCH_RESULTS: StockSearchItem[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 1.0,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.98,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.95,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.92,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.9,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.88,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    type: "Equity",
    region: "United States",
    currency: "USD",
    matchScore: 0.85,
  },
];

export const POPULAR_STOCKS = MOCK_SEARCH_RESULTS;

export const MOCK_QUOTES: Record<string, StockQuote> = {
  AAPL: {
    symbol: "AAPL",
    price: 185.92,
    open: 183.5,
    high: 186.25,
    low: 182.8,
    volume: 52468900,
    latestTradingDay: "2024-01-15",
    previousClose: 184.4,
    change: 1.52,
    changePercent: 0.82,
  },
  MSFT: {
    symbol: "MSFT",
    price: 402.56,
    open: 400.25,
    high: 404.8,
    low: 399.5,
    volume: 28456700,
    latestTradingDay: "2024-01-15",
    previousClose: 401.1,
    change: 1.46,
    changePercent: 0.36,
  },
  GOOGL: {
    symbol: "GOOGL",
    price: 142.35,
    open: 141.2,
    high: 143.1,
    low: 140.8,
    volume: 31245600,
    latestTradingDay: "2024-01-15",
    previousClose: 141.85,
    change: 0.5,
    changePercent: 0.35,
  },
  AMZN: {
    symbol: "AMZN",
    price: 153.42,
    open: 152.1,
    high: 154.2,
    low: 151.5,
    volume: 45678900,
    latestTradingDay: "2024-01-15",
    previousClose: 152.9,
    change: 0.52,
    changePercent: 0.34,
  },
  TSLA: {
    symbol: "TSLA",
    price: 238.45,
    open: 235.8,
    high: 241.2,
    low: 234.5,
    volume: 98765400,
    latestTradingDay: "2024-01-15",
    previousClose: 237.1,
    change: 1.35,
    changePercent: 0.57,
  },
  NVDA: {
    symbol: "NVDA",
    price: 495.22,
    open: 490.5,
    high: 498.8,
    low: 489.2,
    volume: 42567800,
    latestTradingDay: "2024-01-15",
    previousClose: 492.8,
    change: 2.42,
    changePercent: 0.49,
  },
  META: {
    symbol: "META",
    price: 368.9,
    open: 365.4,
    high: 371.2,
    low: 364.8,
    volume: 18934500,
    latestTradingDay: "2024-01-15",
    previousClose: 367.5,
    change: 1.4,
    changePercent: 0.38,
  },
};

function generatePriceHistory(
  currentPrice: number,
  days: number = 30
): Array<{ date: string; price: number }> {
  const history: Array<{ date: string; price: number }> = [];
  const today = new Date("2024-01-15");

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const randomChange = (Math.random() - 0.5) * currentPrice * 0.03;
    const price = currentPrice + randomChange;

    history.push({
      date: date.toISOString().split("T")[0]!,
      price: parseFloat(price.toFixed(2)),
    });
  }

  return history;
}

export const MOCK_PRICE_HISTORY: Record<
  string,
  Array<{ date: string; price: number }>
> = {
  AAPL: generatePriceHistory(185.92),
  MSFT: generatePriceHistory(402.56),
  GOOGL: generatePriceHistory(142.35),
  AMZN: generatePriceHistory(153.42),
  TSLA: generatePriceHistory(238.45),
  NVDA: generatePriceHistory(495.22),
  META: generatePriceHistory(368.9),
};
