import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Booking } from "@/types/booking"

interface BookingsOverviewProps {
  className?: string
  limit?: number
}

export function BookingsOverview({ className, limit = 3 }: BookingsOverviewProps) {
  const upcomingBookings: Booking[] = [
    {
      id: 1,
      venue: "The Blue Note",
      date: "2024-03-20",
      time: "20:00",
      status: "confirmed",
    },
    {
      id: 2,
      venue: "Jazz Corner",
      date: "2024-03-25",
      time: "21:30",
      status: "pending",
    },
    // Add more mock data as needed
  ]

  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
        <CardDescription>Your next scheduled performances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingBookings.slice(0, limit).map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{booking.venue}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
              </div>
              <Badge
                variant={booking.status === "confirmed" ? "default" : "secondary"}
              >
                {booking.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 