"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, MessageSquare, X } from "lucide-react"
import { NotificationsCard } from "./NotificationsCard"
import { MessageInbox } from "./message-inbox"
import { cn } from "@/lib/utils"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  activePanel: 'notifications' | 'messages'
  onPanelChange: (panel: 'notifications' | 'messages') => void
  isCompact?: boolean
}

export function MobileDrawer({
  isOpen,
  onClose,
  activePanel,
  onPanelChange,
  isCompact
}: MobileDrawerProps) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className={cn(
        "fixed inset-x-0 bottom-0",
        "h-[80vh] p-1",
        "bg-background/95 backdrop-blur",
        "shadow-lg rounded-t-xl z-50",
        "border-t border-border/50"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex gap-2">
          <Button
            variant={activePanel === 'notifications' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPanelChange('notifications')}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button
            variant={activePanel === 'messages' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onPanelChange('messages')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <Card className="h-[calc(100%-3rem)] mt-1">
        <ScrollArea className="h-full">
          {activePanel === 'notifications' ? (
            <NotificationsCard isCompact={isCompact} />
          ) : (
            <MessageInbox isCompact={isCompact} />
          )}
        </ScrollArea>
      </Card>
    </motion.div>
  )
} 