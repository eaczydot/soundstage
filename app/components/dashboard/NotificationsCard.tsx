import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bell } from "lucide-react"

// Add notification types and actions
interface Notification {
  id: number
  message: string
  time: string
  type: 'booking' | 'payment' | 'contract'
  action?: {
    label: string
    href: string
  }
}

export function NotificationsCard() {
  const notifications = [
    {
      id: 1,
      message: "New booking request from The Blue Note",
      time: "1 hour ago",
      type: 'booking',
    },
    {
      id: 2,
      message: "Payment received from Jazz Corner",
      time: "2 hours ago",
      type: 'payment',
    },
    {
      id: 3,
      message: "Contract ready for signature",
      time: "3 hours ago",
      type: 'contract',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>Recent updates and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col space-y-1 border-b pb-3 last:border-0"
            >
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-muted-foreground">
                {notification.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 