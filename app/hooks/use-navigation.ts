"use client"

import { useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"
import { useLoading } from "@/providers/loading-provider"

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()

  const navigate = useCallback(
    async (href: string) => {
      if (href === pathname) return

      try {
        startLoading()
        await new Promise(resolve => setTimeout(resolve, 300)) // Minimum loading time
        router.push(href)
      } finally {
        stopLoading()
      }
    },
    [pathname, router, startLoading, stopLoading]
  )

  return { navigate, pathname }
} 