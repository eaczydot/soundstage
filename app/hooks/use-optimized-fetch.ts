"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAsyncPerformance } from './use-performance'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  lastFetched: number | null
}

interface UseFetchOptions {
  cacheTime?: number // Cache duration in ms (default: 5 minutes)
  retryAttempts?: number // Number of retry attempts (default: 3)
  retryDelay?: number // Delay between retries in ms (default: 1000)
  enabled?: boolean // Whether to auto-fetch (default: true)
  refetchOnWindowFocus?: boolean // Refetch when window gains focus (default: false)
  staleTime?: number // Time before data is considered stale in ms (default: 0)
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

export function useOptimizedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseFetchOptions = {}
) {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retryAttempts = 3,
    retryDelay = 1000,
    enabled = true,
    refetchOnWindowFocus = false,
    staleTime = 0
  } = options

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
    lastFetched: null
  })

  const { measureAsync } = useAsyncPerformance()
  const abortControllerRef = useRef<AbortController | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if cached data is still valid
  const getCachedData = useCallback(() => {
    const cached = cache.get(key)
    if (!cached) return null

    const isExpired = Date.now() - cached.timestamp > cacheTime
    return isExpired ? null : cached.data
  }, [key, cacheTime])

  // Check if data is stale
  const isStale = useCallback(() => {
    if (!state.lastFetched) return true
    return Date.now() - state.lastFetched > staleTime
  }, [state.lastFetched, staleTime])

  // Fetch data with retry logic
  const fetchData = useCallback(async (attempt = 1): Promise<void> => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController()

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))

      const result = await measureAsync(
        () => fetcher(),
        `fetch-${key}-attempt-${attempt}`
      )

      // Cache the result
      cache.set(key, { data: result, timestamp: Date.now() })

      setState({
        data: result,
        loading: false,
        error: null,
        lastFetched: Date.now()
      })
    } catch (error) {
      const fetchError = error as Error

      // Don't retry if request was aborted
      if (fetchError.name === 'AbortError') {
        return
      }

      // Retry logic
      if (attempt < retryAttempts) {
        console.warn(`Fetch attempt ${attempt} failed, retrying in ${retryDelay}ms...`)
        
        retryTimeoutRef.current = setTimeout(() => {
          fetchData(attempt + 1)
        }, retryDelay * attempt) // Exponential backoff
        
        return
      }

      // All attempts failed
      setState(prev => ({
        ...prev,
        loading: false,
        error: fetchError
      }))
    }
  }, [key, fetcher, measureAsync, retryAttempts, retryDelay])

  // Manual refetch function
  const refetch = useCallback(() => {
    cache.delete(key) // Clear cache for fresh data
    return fetchData()
  }, [key, fetchData])

  // Mutate function for optimistic updates
  const mutate = useCallback((newData: T | ((prev: T | null) => T)) => {
    setState(prev => ({
      ...prev,
      data: typeof newData === 'function' 
        ? (newData as (prev: T | null) => T)(prev.data)
        : newData,
      lastFetched: Date.now()
    }))

    // Update cache
    const data = typeof newData === 'function' 
      ? (newData as (prev: T | null) => T)(state.data)
      : newData
    cache.set(key, { data, timestamp: Date.now() })
  }, [key, state.data])

  // Initial fetch or when dependencies change
  useEffect(() => {
    if (!enabled) return

    // Check for cached data first
    const cachedData = getCachedData()
    if (cachedData && !isStale()) {
      setState({
        data: cachedData,
        loading: false,
        error: null,
        lastFetched: Date.now()
      })
      return
    }

    fetchData()

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [key, enabled, fetchData, getCachedData, isStale])

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return

    const handleFocus = () => {
      if (isStale()) {
        fetchData()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [refetchOnWindowFocus, fetchData, isStale])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  return {
    ...state,
    refetch,
    mutate,
    isStale: isStale()
  }
}

// Hook for infinite scroll/pagination
export function useInfiniteScroll<T>(
  baseKey: string,
  fetcher: (page: number) => Promise<{ data: T[]; hasMore: boolean }>,
  options: UseFetchOptions = {}
) {
  const [pages, setPages] = useState<T[][]>([])
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const { data, loading, error, refetch } = useOptimizedFetch(
    `${baseKey}-page-${currentPage}`,
    () => fetcher(currentPage),
    options
  )

  useEffect(() => {
    if (data) {
      setPages(prev => {
        const newPages = [...prev]
        newPages[currentPage - 1] = data.data
        return newPages
      })
      setHasMore(data.hasMore)
    }
  }, [data, currentPage])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1)
    }
  }, [loading, hasMore])

  const reset = useCallback(() => {
    setPages([])
    setCurrentPage(1)
    setHasMore(true)
    refetch()
  }, [refetch])

  const allData = pages.flat()

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch
  }
}

// Clear all cache entries
export function clearCache() {
  cache.clear()
}

// Clear specific cache entry
export function clearCacheEntry(key: string) {
  cache.delete(key)
}

// Get cache statistics
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
    totalMemory: JSON.stringify(Array.from(cache.values())).length
  }
}