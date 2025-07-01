"use client"

import { useEffect, useCallback, useRef } from 'react'

interface PerformanceMetrics {
  renderTime: number
  componentMountTime: number
  rerenderCount: number
  memoryUsage?: number
}

interface UsePerformanceOptions {
  trackRerenders?: boolean
  trackMemory?: boolean
  logToConsole?: boolean
  threshold?: number // Log only if render time exceeds threshold (ms)
}

export function usePerformance(
  componentName: string,
  options: UsePerformanceOptions = {}
) {
  const {
    trackRerenders = true,
    trackMemory = false,
    logToConsole = process.env.NODE_ENV === 'development',
    threshold = 16 // 60fps = ~16ms per frame
  } = options

  const mountTimeRef = useRef<number>(Date.now())
  const lastRenderTimeRef = useRef<number>(Date.now())
  const rerenderCountRef = useRef<number>(0)
  const metricsRef = useRef<PerformanceMetrics>({
    renderTime: 0,
    componentMountTime: 0,
    rerenderCount: 0
  })

  // Track component mount time
  useEffect(() => {
    const mountTime = Date.now() - mountTimeRef.current
    metricsRef.current.componentMountTime = mountTime

    if (logToConsole && mountTime > threshold) {
      console.log(`🚀 ${componentName} mounted in ${mountTime}ms`)
    }
  }, [componentName, logToConsole, threshold])

  // Track rerenders
  useEffect(() => {
    if (trackRerenders) {
      rerenderCountRef.current += 1
      metricsRef.current.rerenderCount = rerenderCountRef.current

      if (logToConsole && rerenderCountRef.current > 1) {
        console.log(`🔄 ${componentName} rerendered (${rerenderCountRef.current} times)`)
      }
    }
  })

  // Track render time
  useEffect(() => {
    const renderTime = Date.now() - lastRenderTimeRef.current
    metricsRef.current.renderTime = renderTime
    lastRenderTimeRef.current = Date.now()

    if (logToConsole && renderTime > threshold) {
      console.warn(`⚠️ ${componentName} slow render: ${renderTime}ms`)
    }
  })

  // Track memory usage
  useEffect(() => {
    if (trackMemory && 'memory' in performance) {
      const memory = (performance as any).memory
      metricsRef.current.memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB

      if (logToConsole) {
        console.log(`💾 ${componentName} memory: ${metricsRef.current.memoryUsage.toFixed(2)}MB`)
      }
    }
  }, [componentName, trackMemory, logToConsole])

  const getMetrics = useCallback(() => ({ ...metricsRef.current }), [])

  const markStart = useCallback((label: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${componentName}-${label}-start`)
    }
  }, [componentName])

  const markEnd = useCallback((label: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${componentName}-${label}-end`)
      performance.measure(
        `${componentName}-${label}`,
        `${componentName}-${label}-start`,
        `${componentName}-${label}-end`
      )

      if (logToConsole) {
        const measure = performance.getEntriesByName(`${componentName}-${label}`)[0]
        if (measure && measure.duration > threshold) {
          console.log(`⏱️ ${componentName} ${label}: ${measure.duration.toFixed(2)}ms`)
        }
      }
    }
  }, [componentName, logToConsole, threshold])

  return {
    getMetrics,
    markStart,
    markEnd,
    rerenderCount: rerenderCountRef.current
  }
}

// Hook for measuring async operations
export function useAsyncPerformance() {
  const measureAsync = useCallback(async <T>(
    operation: () => Promise<T>,
    label: string
  ): Promise<T> => {
    const start = Date.now()
    
    try {
      const result = await operation()
      const duration = Date.now() - start
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚡ Async ${label}: ${duration}ms`)
      }
      
      return result
    } catch (error) {
      const duration = Date.now() - start
      
      if (process.env.NODE_ENV === 'development') {
        console.error(`❌ Async ${label} failed after ${duration}ms:`, error)
      }
      
      throw error
    }
  }, [])

  return { measureAsync }
}

// Hook for tracking user interactions
export function useInteractionTracking() {
  const trackClick = useCallback((element: string, metadata?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`👆 Click: ${element}`, metadata)
    }
    
    // In production, this could send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        element_name: element,
        ...metadata
      })
    }
  }, [])

  const trackView = useCallback((view: string, metadata?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`👁️ View: ${view}`, metadata)
    }
    
    // In production, this could send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: view,
        ...metadata
      })
    }
  }, [])

  return { trackClick, trackView }
}