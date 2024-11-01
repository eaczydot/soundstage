import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { routes } from '@/config/routes'

// Flatten routes for searching
const flattenedRoutes = routes.reduce((acc: any[], route) => {
  acc.push({
    label: route.label,
    href: route.href,
    icon: route.icon,
    keywords: route.keywords || [],
  })
  if (route.subItems) {
    route.subItems.forEach((subItem: any) => {
      acc.push({
        label: `${route.label} > ${subItem.label}`,
        href: subItem.href,
        keywords: subItem.keywords || [],
      })
    })
  }
  return acc
}, [])

const fuse = new Fuse(flattenedRoutes, {
  keys: ['label', 'keywords'],
  threshold: 0.3,
})

export function useCommand() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(flattenedRoutes)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!search) {
      setResults(flattenedRoutes)
      return
    }

    const searchResults = fuse.search(search)
    setResults(searchResults.map(result => result.item))
  }, [search])

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setSearch('')
  }

  return {
    isOpen,
    setIsOpen,
    search,
    setSearch,
    results,
    handleSelect,
  }
} 