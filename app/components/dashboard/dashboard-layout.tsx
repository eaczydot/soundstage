"use client"

import { useEffect } from "react"
import { StatsCards } from "./stats-cards"
import { BookingMetrics } from "@/components/analytics/BookingMetrics"
import { MessageInbox } from "./message-inbox"
import { UpcomingPerformances } from "./upcoming-performances"
import { ContractStatus } from "./contract-status"
import { NotificationsCard } from "./NotificationsCard"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDashboardState } from "@/hooks/use-dashboard-state"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Calendar, FileText, MessageSquare, Bell, Settings } from "lucide-react"
import { useMobileLayout } from "@/hooks/use-mobile-layout"
import { MobileDrawer } from "./mobile-drawer"

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between h-10">
      <div className="flex items-center gap-2">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold tracking-tight"
        >
          Dashboard
        </motion.h2>
      </div>
      <Button size="sm" variant="outline" className="h-8">
        <Plus className="h-4 w-4 mr-1" />
        Quick Actions
      </Button>
    </div>
  )
}

const StatsSection = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      <Card className="p-3">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Total Bookings</span>
          <span className="text-2xl font-bold">24</span>
          <span className="text-xs text-muted-foreground mt-1">/ month</span>
        </div>
      </Card>
      <Card className="p-3">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className="text-2xl font-bold">$12,450</span>
          <span className="text-xs text-muted-foreground mt-1">/ month</span>
        </div>
      </Card>
      <Card className="p-3">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Performances</span>
          <span className="text-2xl font-bold">18</span>
          <span className="text-xs text-muted-foreground mt-1">/ month</span>
        </div>
      </Card>
      <Card className="p-3">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Growth</span>
          <span className="text-2xl font-bold">+15%</span>
          <span className="text-xs text-muted-foreground mt-1">/ year</span>
        </div>
      </Card>
    </div>
  )
}

const MainContent = () => {
  const { isCompact } = useDashboardState()
  
  return (
    <div className="grid grid-cols-2 gap-1">
      <Card className="overflow-hidden">
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Contract Status</h3>
          </div>
          <ContractStatus isCompact={isCompact} />
        </ScrollArea>
      </Card>
      
      <Card className="overflow-hidden">
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Upcoming Performances</h3>
          </div>
          <UpcomingPerformances isCompact={isCompact} />
        </ScrollArea>
      </Card>
    </div>
  )
}

const SidePanel = () => {
  const { isCompact } = useDashboardState()
  const { isTablet } = useMobileLayout()
  
  if (!isTablet) return null

  return (
    <div className="col-span-3 space-y-1">
      <Card className="overflow-hidden">
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <span className="text-xs bg-secondary px-2 py-0.5 rounded">2 new</span>
          </div>
          <NotificationsCard isCompact={isCompact} />
        </ScrollArea>
      </Card>
      
      <Card className="overflow-hidden">
        <ScrollArea className="h-[200px]">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Messages</h3>
          </div>
          <MessageInbox isCompact={isCompact} />
        </ScrollArea>
      </Card>
    </div>
  )
}

export function DashboardLayout() {
  const { isCompact, setIsCompact } = useDashboardState()
  const { isDrawerOpen, setIsDrawerOpen, activePanel, setActivePanel, isTablet } = useMobileLayout()

  useEffect(() => {
    const handleResize = () => setIsCompact(window.innerHeight < 800)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsCompact])

  return (
    <div className="h-[calc(100vh-4rem)] p-1 overflow-hidden">
      <DashboardHeader />
      
      <div className="mt-1 space-y-1">
        <StatsSection />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
          <div className="md:col-span-9">
            <MainContent />
          </div>
          <SidePanel />
        </div>
      </div>

      {/* Mobile Navigation */}
      {!isTablet && (
        <>
          <MobileDrawer 
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            activePanel={activePanel}
            onPanelChange={setActivePanel}
            isCompact={isCompact}
          />
          
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 h-14 bg-background border-t flex items-center justify-around px-4"
          >
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-[10px]">Calendar</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <MessageSquare className="h-4 w-4" />
              <span className="text-[10px]">Messages</span>
            </Button>
            <Button variant="primary" size="sm" className="flex flex-col gap-1">
              <Plus className="h-4 w-4" />
              <span className="text-[10px]">New</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Bell className="h-4 w-4" />
              <span className="text-[10px]">Alerts</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Settings className="h-4 w-4" />
              <span className="text-[10px]">Settings</span>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  )
} 