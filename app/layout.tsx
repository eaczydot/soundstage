import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastProvider } from "@/components/providers/toast-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BottomDock } from "@/components/layout/bottom-dock"

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
      <body className={inter.className}>
        <TooltipProvider>
          <ToastProvider />
          {children}
          <BottomDock />
        </TooltipProvider>
      </body>
    </html>
  )
} 