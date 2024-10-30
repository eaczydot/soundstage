import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function BookingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage and schedule your performances
        </p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Booking
      </Button>
    </div>
  )
} 