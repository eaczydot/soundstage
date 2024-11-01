"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ShortcutMap {
  [key: string]: {
    action: () => void
    description: string
  }
}

export function useKeyboardNavigation(routes: any[]) {
  const router = useRouter()
  const [currentFocus, setCurrentFocus] = useState(-1)

  const shortcuts: ShortcutMap = {
    'd': {
      action: () => router.push('/'),
      description: 'Go to Dashboard'
    },
    'b': {
      action: () => router.push('/bookings'),
      description: 'Go to Bookings'
    },
    'v': {
      action: () => router.push('/venues'),
      description: 'Go to Venues'
    },
    'p': {
      action: () => router.push('/performances'),
      description: 'Go to Performances'
    },
    'c': {
      action: () => router.push('/contracts'),
      description: 'Go to Contracts'
    },
    '$': {
      action: () => router.push('/payments'),
      description: 'Go to Payments'
    },
    'm': {
      action: () => router.push('/marketing'),
      description: 'Go to Marketing'
    },
    's': {
      action: () => router.push('/settings'),
      description: 'Go to Settings'
    },
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow key navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCurrentFocus(prev => (prev + 1) % routes.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrentFocus(prev => (prev - 1 + routes.length) % routes.length)
      } else if (e.key === 'Enter' && currentFocus !== -1) {
        e.preventDefault()
        router.push(routes[currentFocus].href)
      }

      // Handle shortcut keys when Alt is pressed
      if (e.altKey && shortcuts[e.key.toLowerCase()]) {
        e.preventDefault()
        shortcuts[e.key.toLowerCase()].action()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentFocus, routes, router])

  return {
    currentFocus,
    shortcuts
  }
} 