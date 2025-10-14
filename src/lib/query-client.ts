"use client"

import { QueryClient } from "@tanstack/react-query"
import { APP_CONFIG } from "@/constants/config"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: APP_CONFIG.cache.staleTime,
        gcTime: APP_CONFIG.cache.gcTime,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (
            error instanceof Error &&
            (error.message.includes("rate limit") ||
              error.message.includes("Invalid"))
          ) {
            return false;
          }
          return failureCount < 2
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
