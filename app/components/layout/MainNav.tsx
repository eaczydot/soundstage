'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Calendar, 
  Music2, 
  FileText, 
  DollarSign, 
  Megaphone,
  Settings 
} from "lucide-react"

const routes = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/bookings",
    label: "Bookings",
    icon: Calendar,
  },
  {
    href: "/events",
    label: "Events",
    icon: Music2,
  },
  {
    href: "/contracts",
    label: "Contracts",
    icon: FileText,
  },
  {
    href: "/payments",
    label: "Payments",
    icon: DollarSign,
  },
  {
    href: "/marketing",
    label: "Marketing",
    icon: Megaphone,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 