import { BookingDetails } from "@/components/bookings/BookingDetails"

interface BookingPageProps {
  params: {
    id: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
        <p className="text-muted-foreground">
          View and manage booking information
        </p>
      </div>
      <BookingDetails bookingId={params.id} />
    </div>
  )
} 