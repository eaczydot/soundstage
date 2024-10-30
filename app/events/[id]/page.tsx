import { EventDetails } from "@/components/events/EventDetails"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Details</h1>
        <p className="text-muted-foreground">
          View and manage event information
        </p>
      </div>
      <EventDetails eventId={params.id} />
    </div>
  )
} 