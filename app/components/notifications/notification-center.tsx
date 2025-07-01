"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Bell, Check, X, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useOptimizedFetch } from "@/hooks/use-optimized-fetch"
import { usePerformance, useInteractionTracking } from "@/hooks/use-performance"
import { formatRelativeTime, getBookingStatusColor } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
}

interface NotificationResponse {
  notifications: Notification[]
  unreadCount: number
  total: number
}

// Mock notification API
const fetchNotifications = async (): Promise<NotificationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const notifications: Notification[] = [
    {
      id: "1",
      type: "success",
      title: "Booking Confirmed",
      message: "Your booking at Blue Note NYC has been confirmed for March 20th",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      read: false,
      actionUrl: "/bookings/1",
      actionLabel: "View Details",
      metadata: { bookingId: "1", venue: "Blue Note NYC" }
    },
    {
      id: "2",
      type: "warning",
      title: "Payment Due",
      message: "Payment for your upcoming gig is due in 2 days",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      read: false,
      actionUrl: "/payments/2",
      actionLabel: "Pay Now",
      metadata: { amount: 500, dueDate: "2024-03-22" }
    },
    {
      id: "3",
      type: "info",
      title: "New Message",
      message: "You have a new message from Sarah Johnson",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: true,
      actionUrl: "/messages/3",
      actionLabel: "Reply",
      metadata: { senderId: "sarah", senderName: "Sarah Johnson" }
    },
    {
      id: "4",
      type: "error",
      title: "Booking Cancelled",
      message: "Your booking at Jazz Corner has been cancelled by the venue",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
      read: true,
      actionUrl: "/bookings/4",
      actionLabel: "Find Alternative",
      metadata: { bookingId: "4", venue: "Jazz Corner", reason: "venue_unavailable" }
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return {
    notifications,
    unreadCount,
    total: notifications.length
  }
}

// Mock mark as read API
const markAsRead = async (notificationIds: string[]): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200))
  console.log('Marked as read:', notificationIds)
}

// Mock mark all as read API
const markAllAsRead = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  console.log('Marked all as read')
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  // Performance monitoring
  const { markStart, markEnd } = usePerformance('NotificationCenter', {
    trackRerenders: true,
    threshold: 20
  })

  // Interaction tracking
  const { trackClick, trackView } = useInteractionTracking()

  // Fetch notifications with caching
  const { 
    data, 
    loading, 
    error, 
    refetch, 
    mutate 
  } = useOptimizedFetch(
    'notifications',
    fetchNotifications,
    {
      cacheTime: 2 * 60 * 1000, // 2 minutes
      staleTime: 30 * 1000,     // 30 seconds
      refetchOnWindowFocus: true,
      retryAttempts: 2
    }
  )

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 30 * 1000)

    return () => clearInterval(interval)
  }, [refetch])

  // Track notification center view
  useEffect(() => {
    if (isOpen) {
      trackView('notification-center', {
        unreadCount: data?.unreadCount || 0,
        totalCount: data?.total || 0
      })
    }
  }, [isOpen, data?.unreadCount, data?.total, trackView])

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    if (!data?.notifications) return []
    
    markStart('filter-notifications')
    const filtered = filter === 'unread' 
      ? data.notifications.filter(n => !n.read)
      : data.notifications
    markEnd('filter-notifications')
    
    return filtered
  }, [data?.notifications, filter, markStart, markEnd])

  // Handle notification click
  const handleNotificationClick = useCallback(async (notification: Notification) => {
    trackClick('notification-item', {
      notificationId: notification.id,
      type: notification.type,
      hasAction: !!notification.actionUrl
    })

    // Mark as read if unread
    if (!notification.read) {
      // Optimistic update
      if (data) {
        mutate({
          ...data,
          notifications: data.notifications.map(n => 
            n.id === notification.id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, data.unreadCount - 1)
        })
      }

      // API call
      try {
        await markAsRead([notification.id])
      } catch (error) {
        // Revert on error
        refetch()
      }
    }

    // Navigate to action URL if available
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }, [trackClick, mutate, refetch])

  // Handle mark all as read
  const handleMarkAllAsRead = useCallback(async () => {
    trackClick('mark-all-read')

    if (!data?.notifications) return

    const unreadNotifications = data.notifications.filter(n => !n.read)
    if (unreadNotifications.length === 0) return

    // Optimistic update
    if (data) {
      mutate({
        ...data,
        notifications: data.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      })
    }

    // API call
    try {
      await markAllAsRead()
    } catch (error) {
      // Revert on error
      refetch()
    }
  }, [trackClick, data?.notifications, mutate, refetch])

  // Get notification icon
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'error': return <X className="h-4 w-4 text-red-600" />
      case 'info': return <Info className="h-4 w-4 text-blue-600" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  // Get notification color
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50'
      case 'warning': return 'border-l-yellow-500 bg-yellow-50'
      case 'error': return 'border-l-red-500 bg-red-50'
      case 'info': return 'border-l-blue-500 bg-blue-50'
      default: return 'border-l-gray-500 bg-gray-50'
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={() => trackClick('notification-bell')}
        >
          <Bell className="h-4 w-4" />
          {data?.unreadCount && data.unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
            >
              {data.unreadCount > 99 ? '99+' : data.unreadCount}
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
                  className="text-xs"
                >
                  {filter === 'all' ? 'Show Unread' : 'Show All'}
                </Button>
                {data?.unreadCount && data.unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllAsRead}
                    className="text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark All Read
                  </Button>
                )}
              </div>
            </div>
            {data && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{data.unreadCount} unread</span>
                <span>{data.total} total</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    trackClick('refresh-notifications')
                    refetch()
                  }}
                  disabled={loading}
                  className="text-xs p-1 h-6"
                >
                  <Clock className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            )}
          </CardHeader>

          <Separator />

          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {loading && !data && (
                <div className="flex items-center justify-center p-8">
                  <Clock className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              )}

              {error && (
                <div className="p-4 text-center">
                  <p className="text-sm text-red-600">Failed to load notifications</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetch()}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </div>
              )}

              {filteredNotifications.length === 0 && !loading && (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                  </p>
                </div>
              )}

              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-accent/50 border-l-4 ${
                      getNotificationColor(notification.type)
                    } ${!notification.read ? 'bg-accent/20' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(notification.timestamp)}
                          </span>
                          {notification.actionLabel && (
                            <Badge variant="outline" className="text-xs">
                              {notification.actionLabel}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}