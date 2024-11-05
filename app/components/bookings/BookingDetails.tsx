'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react"

interface BookingDetailsProps {
  id: string;
}

export function BookingDetails({ id }: BookingDetailsProps) {
  // Mock booking data - replace with real data fetching
  const booking = {
    id,
    venue: "The Blue Note",
    date: "2024-04-15",
    time: "20:00",
    duration: "3 hours",
    status: "confirmed",
    fee: 1500,
    capacity: 250,
    notes: "Standard jazz setup required. Piano tuning needed before performance.",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Booking Details</CardTitle>
            <Badge variant={
              booking.status === "confirmed" ? "success" :
              booking.status === "pending" ? "warning" : "destructive"
            }>
              {booking.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.venue}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formatDate(booking.date)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{booking.time} ({booking.duration})</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formatCurrency(booking.fee)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Capacity: {booking.capacity}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Notes</h4>
            <p className="text-sm text-muted-foreground">{booking.notes}</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Edit Booking</Button>
            <Button variant="destructive">Cancel Booking</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 