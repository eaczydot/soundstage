import { Sidebar } from "./sidebar"

export function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-card">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <div className="h-full max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
} 