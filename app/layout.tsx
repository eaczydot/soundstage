import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from "./lib/utils"
import { Sidebar } from "./components/layout/sidebar"
import { Header } from "./components/layout/header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LoadingProvider } from "@/providers/loading-provider"
import { PageTransition } from "@/components/layout/page-transition"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soundstage',
  description: 'Musician & Venue Management Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <LoadingProvider>
          <TooltipProvider>
            <div className="relative flex min-h-screen">
              <Sidebar className="w-64" />
              <div className="flex-1">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              </div>
            </div>
          </TooltipProvider>
        </LoadingProvider>
      </body>
    </html>
  )
} 