import { BookingsHeader } from "@/components/bookings/BookingsHeader"
import { BookingsCalendar } from "@/components/bookings/BookingsCalendar"
import { BookingsList } from "@/components/bookings/BookingsList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <BookingsHeader />
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-6">
          <BookingsCalendar />
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <BookingsList />
        </TabsContent>
      </Tabs>
    </div>
  )
} 