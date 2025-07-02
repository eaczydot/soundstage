"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { routes } from "@/config/routes"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export function BottomDock() {
  const pathname = usePathname()
  const isMobile = useMobile()

  // Hide on desktop
  if (!isMobile) return null

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-2xl bg-fey-card/80 backdrop-blur-md px-3 py-2 shadow-lg md:hidden"
    >
      {routes.map((route: any) => {
        const isActive = pathname === route.href
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-2 transition-all",
              "rounded-xl text-xs font-medium",
              isActive
                ? "bg-fey-accent/20 text-fey-accent"
                : "text-muted-foreground hover:bg-muted/10"
            )}
          >
            <Icon className="h-5 w-5 mb-0.5" />
            <span className="leading-none">{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}