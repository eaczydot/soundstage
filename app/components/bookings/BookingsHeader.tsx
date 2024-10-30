import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar } from "lucide-react"

export function BookingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage your performance schedule and venue bookings
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Calendar View
        </Button>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
    </div>
  )
} 