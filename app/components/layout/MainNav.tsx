import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/bookings",
      label: "Bookings",
      active: pathname === "/bookings",
    },
    {
      href: "/profile",
      label: "Profile",
      active: pathname === "/profile",
    },
    {
      href: "/payments",
      label: "Payments",
      active: pathname === "/payments",
    },
    {
      href: "/marketing",
      label: "Marketing",
      active: pathname.startsWith("/marketing"),
    },
    {
      href: "/recommendations",
      label: "Recommendations",
      active: pathname.startsWith("/recommendations"),
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 