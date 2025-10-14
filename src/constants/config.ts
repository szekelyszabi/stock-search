// AlphaVantage API: 25 requests/day, 5/minute. Cache aggressively.
export const APP_CONFIG = {
  api: {
    rateLimitRetryAfter: 60,
    requestTimeout: 10000,
  },
  search: {
    debounceMs: 500, // Prevents API spam while typing (balances UX vs 25 requests/day limit)
    minQueryLength: 2,
  },
  cache: {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  },
} as const
