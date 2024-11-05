"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { routes } from "@/config/routes"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsCollapsed(window.innerWidth < 1280)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 64 }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={isCollapsed ? "collapsed" : "expanded"}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        onHoverStart={() => !isMobile && setIsCollapsed(false)}
        onHoverEnd={() => !isMobile && setIsCollapsed(true)}
        className={cn(
          "relative flex h-full flex-col border-r bg-background/50 backdrop-blur",
          isCollapsed ? "items-center" : ""
        )}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "flex h-14 items-center",
            isCollapsed ? "justify-center" : "px-4"
          )}
        >
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">
              {isCollapsed ? "S" : "SOUNDSTAGE"}
            </span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {routes.map((route) => (
              <Tooltip key={route.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === route.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-0",
                      pathname === route.href && "bg-accent"
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className={cn(
                        "h-4 w-4",
                        !isCollapsed && "mr-2"
                      )} />
                      {!isCollapsed && (
                        <span>{route.label}</span>
                      )}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {route.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </ScrollArea>
      </motion.div>
    </AnimatePresence>
  )
} 