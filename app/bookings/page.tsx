import { BookingsCalendar } from "@/components/bookings/BookingsCalendar"

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">
          Manage your performance schedule and venue bookings
        </p>
      </div>
      <BookingsCalendar />
    </div>
  )
} 