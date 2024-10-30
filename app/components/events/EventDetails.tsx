'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Share2, Download } from "lucide-react"
import Image from "next/image"
import { RSVPDialog } from "./RSVPDialog"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [rsvpDialogOpen, setRsvpDialogOpen] = useState(false)

  const event = {
    id: eventId,
    title: "Jazz Night at The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    venue: "The Blue Note",
    address: "131 W 3rd St, New York, NY 10012",
    description: "Join us for an evening of classic jazz standards and original compositions.",
    imageUrl: "/events/jazz-night.jpg",
    rsvpCount: 85,
    capacity: 150,
    performers: [
      "John Doe Quartet",
      "Special Guest: Jane Smith"
    ],
    ticketPrice: 25,
    status: "upcoming"
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="relative h-[300px] rounded-lg overflow-hidden mb-6">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <Badge>{event.status}</Badge>
            </div>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>
                {event.rsvpCount} / {event.capacity} attending
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Performers</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {event.performers.map((performer) => (
                <li key={performer}>{performer}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => setRsvpDialogOpen(true)}>
              RSVP Now
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Ticket Information</h2>
            <p className="text-2xl font-bold">${event.ticketPrice}</p>
            <p className="text-sm text-muted-foreground">
              General Admission
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Venue Details</h2>
            <div className="aspect-square relative rounded-lg overflow-hidden">
              {/* Add venue map or image here */}
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Venue Map</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <RSVPDialog
        open={rsvpDialogOpen}
        onOpenChange={setRsvpDialogOpen}
        eventId={event.id}
        eventTitle={event.title}
      />
    </div>
  )
} 