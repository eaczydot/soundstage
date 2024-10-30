'use client'

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingOverview } from "./details/BookingOverview"
import { PaymentDetails } from "@/components/payments/PaymentDetails"
import { ContractViewer } from "@/components/contracts/ContractViewer"
import { useStore } from "@/store"

interface BookingDetailsProps {
  bookingId: string
}

export function BookingDetails({ bookingId }: BookingDetailsProps) {
  const booking = useStore((state) => 
    state.bookings.find(b => b.id.toString() === bookingId)
  )

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
        <TabsTrigger value="contract">Contract</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <BookingOverview booking={booking} />
      </TabsContent>

      <TabsContent value="contract">
        <ContractViewer bookingId={bookingId} />
      </TabsContent>

      <TabsContent value="payment">
        <PaymentDetails bookingId={bookingId} />
      </TabsContent>
    </Tabs>
  )
} 