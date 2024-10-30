'use client'

import { cn } from "@/lib/utils"
import { MainNav } from "./MainNav"
import { UserNav } from "./UserNav"
import { NotificationCenter } from "../notifications/NotificationCenter"
import { QuickActions } from "./QuickActions"
import { useState, useEffect } from "react"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <QuickActions />
            <NotificationCenter />
            <UserNav />
          </div>
        </div>
      </header>
      <main className={cn("container mx-auto py-6", className)}>
        {children}
      </main>
    </div>
  )
} 