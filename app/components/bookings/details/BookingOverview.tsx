'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Music, DollarSign, FileText } from "lucide-react"
import { Booking } from "@/types"

interface BookingOverviewProps {
  booking: Booking
}

export function BookingOverview({ booking }: BookingOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Event Details</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{booking.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>Payment: ${booking.amount}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <Badge>{booking.status}</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Requirements</h2>
        <div className="space-y-2">
          {booking.requirements?.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              <Music className="h-4 w-4 text-muted-foreground" />
              <span>{req}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button className="w-full">Edit Requirements</Button>
        </div>
      </Card>
    </div>
  )
} 