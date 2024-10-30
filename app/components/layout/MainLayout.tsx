import { cn } from "@/lib/utils"
import { MainNav } from "./MainNav"
import { UserNav } from "./UserNav"
import { NotificationCenter } from "../notifications/NotificationCenter"
import { QuickActions } from "./QuickActions"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <QuickActions />
            <NotificationCenter />
            <UserNav />
          </div>
        </div>
      </div>
      <main className={cn("container mx-auto py-6", className)}>
        {children}
      </main>
    </div>
  )
} 