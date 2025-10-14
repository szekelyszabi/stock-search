# Stock Search App

  A Next.js application for searching and viewing real-time stock data using the AlphaVantage API.

  ## Features

  - Real-time stock search with auto-suggestions
  - Stock detail pages with current price, volume, and key metrics
  - 30-day price history charts
  - Favorites management with localStorage
  - Responsive mobile design

  ## Tech Stack

  - **Next.js 15** (App Router with TypeScript)
  - **TanStack Query** for data fetching and caching
  - **Tailwind CSS** + **shadcn/ui** for styling
  - **Recharts** for price charts
  - **AlphaVantage API** for stock data

  ## Setup

  ```bash
  # Install dependencies
  npm install

  # Add your API key
  echo "ALPHAVANTAGE_API_KEY=your_key_here" > .env.local

  # Run development server
  npm run dev

  Get a free API key at https://www.alphavantage.co/support/#api-key

  Architecture Notes

  API Integration

  The app uses Next.js API routes (/api/stock/*) to proxy requests to AlphaVantage. This keeps the API key secure on the server and allows for server-side caching.

  Hybrid Data Strategy

  The popular stocks list on the homepage uses static mock data to avoid an unnecessary API call on every page load. All search results and stock detail pages fetch real-time data from the API. This approach balances user experience with API quota preservation.

  Caching Strategy

  TanStack Query is configured with a 5-minute staleTime to reduce API calls. AlphaVantags free tier has a 25 requests/day limit, so aggressive caching is essential.

  Search queries are debounced by 500ms to avoid excessive API calls while typing.

  Code Organization

  src/
  ├── app/              # Pages and API routes
  ├── components/       # React components
  ├── hooks/            # Custom hooks (debounce, queries)
  ├── lib/              # API service layer
  └── types/            # TypeScript interfaces

  Scripts

  npm run dev          # Development server
  npm run build        # Production build
  npm run lint         # Run linter
  npm run type-check   # TypeScript check

  Deployment

  Built to deploy on Vercel with zero configuration.
