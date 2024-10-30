import { BookingDetails } from "@/components/bookings/BookingDetails"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function BookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/bookings">
            <ChevronLeft className="h-4 w-4" />
            Back to Bookings
          </Link>
        </Button>
      </div>
      <BookingDetails bookingId={params.id} />
    </div>
  )
} 