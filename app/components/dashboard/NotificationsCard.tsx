"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CompactProps } from "@/types/layout"
import { cn } from "@/lib/utils"
import { Calendar, DollarSign, FileText, X, Check } from "lucide-react"

interface Notification {
  id: string
  type: 'booking' | 'payment' | 'contract'
  venue: string
  amount?: number
  date?: string
  time: string
  read: boolean
  urgent?: boolean
}

export function NotificationsCard({ isCompact }: CompactProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      venue: 'Blue Note NYC',
      date: '03/20',
      time: '5m',
      read: false,
      urgent: true
    },
    {
      id: '2',
      type: 'payment',
      venue: 'Jazz Corner',
      amount: 2400,
      time: '1h',
      read: false
    },
    {
      id: '3',
      type: 'contract',
      venue: 'Village Vanguard',
      time: '2h',
      read: true
    }
  ])

  const getIcon = (type: string, amount?: number) => {
    switch (type) {
      case 'booking': return Calendar
      case 'payment': return () => (
        <div className="flex items-center text-green-500">
          <DollarSign className="h-4 w-4" />
          <span className="ml-1 text-sm font-medium">+{amount?.toLocaleString()}</span>
        </div>
      )
      case 'contract': return FileText
    }
  }

  const handleMarkRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <ScrollArea className="h-[calc(100%-2rem)] px-1">
      <div className="space-y-2">
        <AnimatePresence>
          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type, notification.amount)
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={cn(
                  "relative flex items-center gap-3 rounded-lg border p-2",
                  notification.read ? 'bg-background' : 'bg-accent/5',
                  notification.urgent ? 'border-destructive/50' : 'border-border'
                )}>
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 rounded-full p-2",
                    notification.type === 'payment' ? 'bg-green-500/10' :
                    notification.urgent ? 'bg-destructive/10 text-destructive' : 'bg-muted'
                  )}>
                    {Icon && <Icon />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">
                        {notification.venue}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {notification.time}
                      </span>
                    </div>
                    {notification.date && (
                      <span className="text-xs text-muted-foreground">
                        {notification.date}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleMarkRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleDismiss(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
} 