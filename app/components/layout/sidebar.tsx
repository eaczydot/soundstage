"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { routes } from "@/config/routes"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ChevronRight } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSubNav, setOpenSubNav] = useState<string | null>(null)

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent 
            pathname={pathname}
            isCollapsed={false}
            openSubNav={openSubNav}
            setOpenSubNav={setOpenSubNav}
          />
        </SheetContent>
      </Sheet>

      <motion.aside
        className={cn(
          "fixed hidden h-screen border-r bg-card md:flex flex-col",
          className
        )}
        animate={{
          width: isCollapsed ? "4rem" : "16rem",
          transition: { duration: 0.2, ease: "easeInOut" }
        }}
      >
        <div className="flex h-14 items-center justify-end border-b px-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        <ScrollArea className="flex-1 bg-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={isCollapsed ? "collapsed" : "expanded"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarContent
                pathname={pathname}
                isCollapsed={isCollapsed}
                openSubNav={openSubNav}
                setOpenSubNav={setOpenSubNav}
              />
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </motion.aside>

      <motion.div
        className="hidden md:block"
        animate={{
          marginLeft: isCollapsed ? "4rem" : "16rem",
          transition: { duration: 0.2, ease: "easeInOut" }
        }}
      />
    </>
  )
}

interface SidebarContentProps {
  pathname: string
  isCollapsed: boolean
  openSubNav: string | null
  setOpenSubNav: (href: string | null) => void
}

function SidebarContent({ pathname, isCollapsed, openSubNav, setOpenSubNav }: SidebarContentProps) {
  return (
    <ScrollArea className="h-full border-r bg-background px-3 py-2">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className={cn(
              "mb-2 px-4 text-lg font-semibold tracking-tight",
              isCollapsed && "hidden"
            )}>
              Navigation
            </h2>
            <nav className="grid gap-1">
              {routes.map((route, i) => {
                const isActive = pathname === route.href
                const isSubNavOpen = openSubNav === route.href

                return (
                  <div key={route.href}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div className="relative">
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start",
                              isCollapsed && "justify-center"
                            )}
                            onClick={() => {
                              if (route.subItems) {
                                setOpenSubNav(isSubNavOpen ? null : route.href)
                              }
                            }}
                          >
                            <route.icon className={cn(
                              "h-4 w-4",
                              isCollapsed ? "mr-0" : "mr-2"
                            )} />
                            {!isCollapsed && (
                              <>
                                <span>{route.label}</span>
                                {route.subItems && (
                                  <ChevronRight className={cn(
                                    "ml-auto h-4 w-4 transition-transform",
                                    isSubNavOpen && "rotate-90"
                                  )} />
                                )}
                              </>
                            )}
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {isCollapsed && (
                        <TooltipContent side="right" className="flex items-center gap-4">
                          {route.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                    {!isCollapsed && route.subItems && isSubNavOpen && (
                      <div className="ml-4 mt-1 grid gap-1">
                        {route.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-accent hover:text-accent-foreground",
                              pathname === subItem.href && "bg-accent text-accent-foreground",
                              "transition-colors"
                            )}
                          >
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
} 