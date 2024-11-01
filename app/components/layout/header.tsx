"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { CommandMenu } from "@/components/layout/command-menu"
import { routes } from "@/config/routes"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "./notification-dropdown"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Settings, User, LogOut } from "lucide-react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    // Add your logout logic here
    try {
      // await signOut() or your auth logout function
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const quickActions = [
    {
      label: "New Booking",
      href: "/bookings/new",
      description: "Create a new venue booking"
    },
    {
      label: "New Performance",
      href: "/performances/new",
      description: "Schedule a new performance"
    },
    {
      label: "New Contract",
      href: "/contracts/new",
      description: "Create a new contract"
    }
  ]

  const userMenuItems = [
    {
      label: "Profile",
      href: "/profile",
      icon: User
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        <CommandMenu routes={routes} />
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <NotificationDropdown />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {quickActions.map((action) => (
                  <DropdownMenuItem
                    key={action.href}
                    className="cursor-pointer"
                    onClick={() => router.push(action.href)}
                  >
                    <div className="flex flex-col">
                      <span>{action.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.png" alt="@user" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    className="cursor-pointer"
                    onClick={() => router.push(item.href)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
} 