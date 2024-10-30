'use client'

import { useState } from "react"
import { Bell, Calendar, DollarSign, FileText, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatRelative } from "@/lib/date"

interface Notification {
  id: string
  type: 'booking' | 'payment' | 'document' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  action?: {
    label: string
    href: string
  }
  priority?: 'low' | 'medium' | 'high'
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'The Blue Note has requested a booking for March 20th',
      timestamp: '2024-03-15T10:00:00',
      read: false,
      action: {
        label: 'Review Request',
        href: '/bookings/1'
      },
      priority: 'high'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $500 received from Jazz Corner',
      timestamp: '2024-03-14T15:30:00',
      read: false,
      action: {
        label: 'View Payment',
        href: '/payments/2'
      }
    },
    {
      id: '3',
      type: 'document',
      title: 'Contract Ready',
      message: 'Contract for upcoming performance is ready for review',
      timestamp: '2024-03-13T09:15:00',
      read: true,
      action: {
        label: 'Review Contract',
        href: '/documents/3'
      }
    }
  ])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-4 w-4" />
      case 'payment':
        return <DollarSign className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </SheetHeader>
        <Tabs defaultValue="all" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {['all', 'booking', 'payment', 'document'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="space-y-4">
                  {notifications
                    .filter(n => tab === 'all' || n.type === tab)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-lg border",
                          !notification.read && "bg-muted",
                          notification.priority === 'high' && "border-destructive"
                        )}
                      >
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">
                              {formatRelative(notification.timestamp)}
                            </p>
                            {notification.action && (
                              <Button
                                variant="link"
                                className="h-auto p-0 text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                {notification.action.label}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
} 