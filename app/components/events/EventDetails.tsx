'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Share2,
  Users,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react"
import { RSVPDialog } from "./RSVPDialog"
import Image from "next/image"

interface EventDetailsProps {
  eventId: string
}

export function EventDetails({ eventId }: EventDetailsProps) {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false)

  // Mock event data - would come from API
  const event = {
    id: eventId,
    title: "Jazz Night at The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    venue: "The Blue Note",
    address: "131 W 3rd St, New York, NY 10012",
    description: "Join us for an evening of classic jazz standards and original compositions. Featuring a stellar lineup of musicians and a warm, intimate atmosphere.",
    performers: [
      { name: "John Doe", instrument: "Piano" },
      { name: "Jane Smith", instrument: "Saxophone" },
      { name: "Mike Johnson", instrument: "Bass" },
      { name: "Sarah Williams", instrument: "Drums" },
    ],
    ticketPrice: "$25",
    capacity: 150,
    rsvpCount: 85,
    imageUrl: "/events/jazz-night.jpg",
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card className="overflow-hidden">
          <div className="relative h-[300px]">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>{event.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Performers</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {event.performers.map((performer) => (
                  <div
                    key={performer.name}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <Music className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {performer.instrument}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Event Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Ticket Price</span>
                <Badge variant="secondary">{event.ticketPrice}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Capacity</span>
                <span>{event.capacity} seats</span>
              </div>
              <div className="flex justify-between items-center">
                <span>RSVP Count</span>
                <span>{event.rsvpCount} attending</span>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={() => setIsRSVPOpen(true)}>
            <Users className="mr-2 h-4 w-4" />
            RSVP Now
          </Button>

          <div className="space-y-2">
            <p className="text-sm font-medium">Share Event</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Venue Location</h2>
            <p className="text-sm text-muted-foreground">{event.address}</p>
          </div>
          {/* Add map component here */}
        </Card>
      </div>

      <RSVPDialog
        open={isRSVPOpen}
        onOpenChange={setIsRSVPOpen}
        eventId={eventId}
        eventTitle={event.title}
      />
    </div>
  )
} 