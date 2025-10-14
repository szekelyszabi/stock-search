'use client'

import { useLocalStorage } from './use-local-storage'

export function useFavorites() {
  const [favorites, setFavorites, isHydrated] = useLocalStorage<string[]>('stock-favorites', [])

  const addFavorite = (symbol: string) => {
    setFavorites((prev) => [...prev, symbol.toUpperCase()])
  }

  const removeFavorite = (symbol: string) => {
    setFavorites((prev) => prev.filter((s) => s !== symbol.toUpperCase()))
  }

  const isFavorite = (symbol: string) => {
    return favorites.includes(symbol.toUpperCase())
  }

  const toggleFavorite = (symbol: string) => {
    if (isFavorite(symbol)) {
      removeFavorite(symbol)
    } else {
      addFavorite(symbol)
    }
  }

  const clearAll = () => {
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    clearAll,
    isHydrated,
  }
}
