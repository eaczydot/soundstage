"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bell, 
  Search, 
  MessageSquare, 
  Settings,
  Plus,
  Calendar,
  Building2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useDashboardState } from "@/hooks/use-dashboard-state"

const mainActions = [
  { label: 'New Booking', icon: Calendar, href: '/bookings/new' },
  { label: 'Add Venue', icon: Building2, href: '/venues/new' },
]

export function Header() {
  const pathname = usePathname()
  const { isCompact } = useDashboardState()
  const [showSearch, setShowSearch] = useState(false)

  // Get current section from pathname
  const currentSection = pathname === "/" ? "" : 
    pathname.split("/")[1].charAt(0).toUpperCase() + 
    pathname.split("/")[1].slice(1)

  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left: Search */}
        <div className={cn(
          "relative transition-all duration-200",
          showSearch ? "w-96" : "w-64"
        )}>
          <Search 
            className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 h-9"
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          />
        </div>

        {/* Center: Navigation */}
        {currentSection && (
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${currentSection.toLowerCase()}`}>Overview</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${currentSection.toLowerCase()}/calendar`}>Calendar</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${currentSection.toLowerCase()}/analytics`}>Analytics</Link>
            </Button>
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {mainActions.map((action) => (
                <DropdownMenuItem key={action.href} asChild>
                  <Link href={action.href} className="flex items-center">
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
              2
            </span>
          </Button>

          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 