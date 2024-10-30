import { EventsHeader } from "@/components/events/EventsHeader"
import { EventsList } from "@/components/events/EventsList"

export default function EventsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <EventsHeader />
      <EventsList />
    </div>
  )
} 