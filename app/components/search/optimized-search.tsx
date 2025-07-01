"use client"

import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOptimizedFetch } from "@/hooks/use-optimized-fetch"
import { usePerformance, useInteractionTracking } from "@/hooks/use-performance"
import { debounce, throttle } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface SearchResult {
  id: string
  type: 'venue' | 'musician' | 'booking'
  title: string
  subtitle: string
  description: string
  tags: string[]
  score: number
}

interface SearchResponse {
  results: SearchResult[]
  total: number
  query: string
  suggestions: string[]
}

interface OptimizedSearchProps {
  placeholder?: string
  onResultSelect?: (result: SearchResult) => void
  filters?: string[]
  maxResults?: number
  minQueryLength?: number
}

// Mock search API
const searchAPI = async (query: string, filters: string[] = []): Promise<SearchResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))
  
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "venue" as const,
      title: "Blue Note NYC",
      subtitle: "Jazz Club",
      description: "Iconic jazz venue in Greenwich Village",
      tags: ["jazz", "live-music", "nyc"],
      score: 0.95
    },
    {
      id: "2", 
      type: "musician" as const,
      title: "Sarah Johnson",
      subtitle: "Jazz Pianist",
      description: "Professional jazz pianist with 15+ years experience",
      tags: ["piano", "jazz", "solo"],
      score: 0.87
    },
    {
      id: "3",
      type: "booking" as const,
      title: "Jazz Night at The Corner",
      subtitle: "March 20, 2024",
      description: "Weekly jazz performance series",
      tags: ["weekly", "jazz", "series"],
      score: 0.73
    }
  ].filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase()) ||
    result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ).filter(result => 
    filters.length === 0 || filters.includes(result.type)
  )

  return {
    results: mockResults,
    total: mockResults.length,
    query,
    suggestions: ["jazz venues", "piano players", "upcoming events"]
  }
}

export function OptimizedSearch({
  placeholder = "Search venues, musicians, bookings...",
  onResultSelect,
  filters = [],
  maxResults = 10,
  minQueryLength = 2
}: OptimizedSearchProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Performance monitoring
  const { markStart, markEnd } = usePerformance('OptimizedSearch', {
    trackRerenders: true,
    threshold: 10
  })

  // Interaction tracking
  const { trackClick, trackView } = useInteractionTracking()

  // Debounced search query
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => {
      setDebouncedQuery(value)
    }, 300),
    []
  )

  // Throttled input handler for immediate UI feedback
  const throttledInputHandler = useMemo(
    () => throttle((value: string) => {
      setQuery(value)
      if (value.length >= minQueryLength) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }, 100),
    [minQueryLength]
  )

  // Search with caching
  const { 
    data, 
    loading, 
    error 
  } = useOptimizedFetch(
    `search-${debouncedQuery}-${filters.join(',')}`,
    () => searchAPI(debouncedQuery, filters),
    {
      enabled: debouncedQuery.length >= minQueryLength,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 5 * 60 * 1000,   // 5 minutes
    }
  )

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    throttledInputHandler(value)
    debouncedSetQuery(value)
    setSelectedIndex(-1)
  }, [throttledInputHandler, debouncedSetQuery])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || !data?.results) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < data.results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && data.results[selectedIndex]) {
          handleResultSelect(data.results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }, [isOpen, data?.results, selectedIndex])

  // Handle result selection
  const handleResultSelect = useCallback((result: SearchResult) => {
    markStart('result-selection')
    
    trackClick('search-result', {
      resultId: result.id,
      resultType: result.type,
      query: debouncedQuery,
      position: selectedIndex
    })

    setQuery(result.title)
    setIsOpen(false)
    setSelectedIndex(-1)
    onResultSelect?.(result)
    
    markEnd('result-selection')
  }, [markStart, markEnd, trackClick, debouncedQuery, selectedIndex, onResultSelect])

  // Clear search
  const handleClear = useCallback(() => {
    setQuery("")
    setDebouncedQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.focus()
    trackClick('search-clear')
  }, [trackClick])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Track search view
  useEffect(() => {
    if (isOpen && data?.results) {
      trackView('search-results', {
        query: debouncedQuery,
        resultCount: data.results.length
      })
    }
  }, [isOpen, data?.results, debouncedQuery, trackView])

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'venue': return '🏢'
      case 'musician': return '🎵'
      case 'booking': return '📅'
      default: return '🔍'
    }
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'venue': return 'bg-blue-100 text-blue-700'
      case 'musician': return 'bg-green-100 text-green-700'
      case 'booking': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="relative w-full max-w-2xl" ref={resultsRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-10"
          autoComplete="off"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <Card className="shadow-lg border">
              <CardContent className="p-0">
                {loading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm text-muted-foreground">Searching...</span>
                  </div>
                )}

                {error && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-red-600">
                      Search failed. Please try again.
                    </p>
                  </div>
                )}

                {data?.results && data.results.length > 0 && (
                  <div className="max-h-96 overflow-y-auto">
                    {data.results.slice(0, maxResults).map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 cursor-pointer transition-colors border-b last:border-b-0 ${
                          selectedIndex === index 
                            ? 'bg-accent' 
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => handleResultSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">{getResultIcon(result.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm truncate">
                                {result.title}
                              </h4>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${getTypeColor(result.type)}`}
                              >
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {result.subtitle}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {result.description}
                            </p>
                            {result.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {result.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round(result.score * 100)}%
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {data?.results && data.results.length === 0 && (
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      No results found for "{debouncedQuery}"
                    </p>
                    {data.suggestions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-2">Try searching for:</p>
                        <div className="flex gap-1 justify-center flex-wrap">
                          {data.suggestions.map(suggestion => (
                            <Badge 
                              key={suggestion} 
                              variant="outline" 
                              className="text-xs cursor-pointer hover:bg-accent"
                              onClick={() => {
                                setQuery(suggestion)
                                debouncedSetQuery(suggestion)
                              }}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {data?.total && data.total > maxResults && (
                  <div className="p-3 border-t bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">
                      Showing {maxResults} of {data.total} results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}