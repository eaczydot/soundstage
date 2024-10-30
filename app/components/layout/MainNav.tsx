'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Calendar, 
  Music2, 
  FileText, 
  DollarSign, 
  Megaphone,
  Settings 
} from "lucide-react"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    {
      href: "/bookings",
      label: "Bookings",
      icon: Calendar,
      active: pathname === "/bookings",
    },
    {
      href: "/events",
      label: "Events",
      icon: Music2,
      active: pathname === "/events",
    },
    {
      href: "/contracts",
      label: "Contracts",
      icon: FileText,
      active: pathname === "/contracts",
    },
    {
      href: "/payments",
      label: "Payments",
      icon: DollarSign,
      active: pathname === "/payments",
    },
    {
      href: "/marketing",
      label: "Marketing",
      icon: Megaphone,
      active: pathname.startsWith("/marketing"),
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 