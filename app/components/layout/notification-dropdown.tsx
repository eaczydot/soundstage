"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/hooks/use-notifications"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatRelativeTime } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function NotificationDropdown() {
  const router = useRouter()
  const notifications = useNotifications((state) => state.notifications)
  const markAsRead = useNotifications((state) => state.markAsRead)
  const markAllAsRead = useNotifications((state) => state.markAllAsRead)
  
  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id)
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'message':
        router.push('/messages')
        break
      case 'booking':
        router.push('/bookings')
        break
      case 'payment':
        router.push('/payments')
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between p-4">
          <h4 className="text-sm font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex flex-col items-start p-4 cursor-pointer",
                  !notification.read && "bg-accent"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{notification.title}</span>
                  {!notification.read && (
                    <Badge variant="secondary" className="h-5 text-xs">New</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {notification.description}
                </p>
                <span className="text-xs text-muted-foreground mt-1">
                  {formatRelativeTime(notification.timestamp)}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 