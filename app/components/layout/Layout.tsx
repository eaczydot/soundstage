import { MainNav } from "./MainNav"
import { UserNav } from "./UserNav"
import { NotificationCenter } from "../notifications/NotificationCenter"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationCenter />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  )
} 