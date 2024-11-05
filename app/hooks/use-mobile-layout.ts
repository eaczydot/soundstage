import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export function useMobileLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<'main' | 'notifications' | 'messages'>('main')
  const isTablet = useMediaQuery("(min-width: 768px)")
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Auto-close drawer when switching to tablet/desktop
  useEffect(() => {
    if (isTablet) {
      setIsDrawerOpen(false)
      setActivePanel('main')
    }
  }, [isTablet])

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    activePanel,
    setActivePanel,
    isTablet,
    isDesktop
  }
} 