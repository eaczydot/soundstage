"use client"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useDashboardState } from "@/hooks/use-dashboard-state"

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isCompact } = useDashboardState()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <motion.main 
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "flex-1 overflow-auto",
              "bg-muted/30",
              isCompact ? "p-2" : "p-4",
              "transition-all duration-200"
            )}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  )
} 