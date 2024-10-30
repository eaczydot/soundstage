import { EventDetails } from "@/components/events/EventDetails"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/events">
            <ChevronLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
      <EventDetails eventId={params.id} />
    </div>
  )
} 