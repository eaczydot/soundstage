'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Music, DollarSign, FileText } from "lucide-react"
import { Booking } from "@/types"
import { StageSetupEditor } from "../equipment/StageSetupEditor"
import { ContractViewer } from "../contracts/ContractViewer"
import { PaymentDetails } from "../payments/PaymentDetails"

interface BookingDetailsProps {
  bookingId: string
}

export function BookingDetails({ bookingId }: BookingDetailsProps) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)

  // Add loading state and error handling
  if (loading) {
    return <div>Loading...</div>
  }

  if (!booking) {
    return <div>Booking not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{booking.venue}</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{booking.startTime} - {booking.endTime}</span>
            </div>
          </div>
        </div>
        <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
          {booking.status}
        </Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Stage Setup</TabsTrigger>
          <TabsTrigger value="contract">Contract</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-muted-foreground" />
                  <span>Performance Duration: {booking.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Payment: ${booking.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Contract Status: {booking.contract}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Requirements</h2>
              <div className="space-y-2">
                {booking.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>• {req}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="setup">
          <StageSetupEditor bookingId={bookingId} />
        </TabsContent>

        <TabsContent value="contract">
          <ContractViewer bookingId={bookingId} />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentDetails bookingId={bookingId} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 