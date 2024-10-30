import { BookingsHeader } from "@/components/bookings/BookingsHeader"
import { BookingsList } from "@/components/bookings/BookingsList"
import { BookingsCalendar } from "@/components/bookings/BookingsCalendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <BookingsHeader />
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <BookingsList />
        </TabsContent>
        <TabsContent value="calendar">
          <BookingsCalendar />
        </TabsContent>
      </Tabs>
    </div>
  )
} 