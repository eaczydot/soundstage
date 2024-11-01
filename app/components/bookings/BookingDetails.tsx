'use client'

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, DollarSign, FileText } from "lucide-react"
import { useStore } from "@/store"
import { getBookingById } from "@/services/bookings"
import { Booking } from "@/types/booking"

interface BookingDetailsProps {
  bookingId: string
}

export function BookingDetails({ bookingId }: BookingDetailsProps) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { updateBooking } = useStore()

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await getBookingById(bookingId)
        setBooking(data)
      } catch (error) {
        console.error('Error fetching booking:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!booking) {
    return (
      <Card className="p-6">
        <p>Booking not found</p>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Booking Details</h2>
              <Badge variant={
                booking.status === 'confirmed' ? 'success' :
                booking.status === 'pending' ? 'warning' :
                'destructive'
              }>
                {booking.status}
              </Badge>
            </div>

            <div className="grid gap-4">
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
                <span>${booking.amount}</span>
              </div>
              {booking.notes && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-muted-foreground">{booking.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={() => updateBooking(booking.id, { status: 'confirmed' })}>
                Confirm Booking
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Download Details
              </Button>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="requirements">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-medium">Equipment Requirements</h3>
            {booking.requirements?.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-medium">Payment Information</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Base Amount</span>
                <span>${booking.amount}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service Fee</span>
                <span>$25</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-2">
                <span>Total</span>
                <span>${(booking.amount || 0) + 25}</span>
              </div>
            </div>
            <Button className="w-full">Process Payment</Button>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 