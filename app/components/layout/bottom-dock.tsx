"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Music2,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

const dockItems = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/dashboard",
    color: "text-fey-accent-green"
  },
  {
    id: "bookings",
    label: "Bookings",
    icon: Music2,
    href: "/bookings",
    color: "text-fey-accent-purple"
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-fey-accent-cyan"
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
    color: "text-fey-accent-blue"
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
    color: "text-white"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-white"
  }
]

export function BottomDock() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [activeItem, setActiveItem] = useState<string | null>(null)

  // Only show on mobile
  if (!isMobile) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="fey-glass rounded-2xl p-2 flex items-center gap-1">
        <AnimatePresence>
          {dockItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon
            
            return (
              <motion.div
                key={item.id}
                onHoverStart={() => setActiveItem(item.id)}
                onHoverEnd={() => setActiveItem(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200",
                    isActive 
                      ? "bg-white/10 text-white shadow-lg" 
                      : "hover:bg-white/5 text-white/70 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Link>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {activeItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="bg-black/90 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                        {item.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {/* Add/Create button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="ml-2 pl-2 border-l border-white/10"
        >
          <button className="flex items-center justify-center w-12 h-12 rounded-xl bg-fey-accent-green/20 text-fey-accent-green hover:bg-fey-accent-green/30 transition-all duration-200">
            <Plus className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}