import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"

export function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 