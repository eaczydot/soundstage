import { EventsHeader } from "@/components/events/EventsHeader"
import { EventsList } from "@/components/events/EventsList"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <EventsHeader />
      <EventsList />
    </div>
  )
} 