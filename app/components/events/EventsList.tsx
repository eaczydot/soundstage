'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Event {
  id: string
  title: string
  date: string
  time: string
  venue: string
  rsvpCount: number
  capacity: number
  imageUrl: string
}

export function EventsList() {
  const [searchTerm, setSearchTerm] = useState("")

  const events: Event[] = [
    {
      id: "1",
      title: "Jazz Night at The Blue Note",
      date: "2024-03-20",
      time: "20:00",
      venue: "The Blue Note",
      rsvpCount: 85,
      capacity: 150,
      imageUrl: "/events/jazz-night.jpg",
    },
    {
      id: "2",
      title: "Latin Jazz Fusion",
      date: "2024-03-25",
      time: "21:30",
      venue: "Jazz Corner",
      rsvpCount: 45,
      capacity: 100,
      imageUrl: "/events/latin-jazz.jpg",
    },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-[200px]">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-semibold text-xl">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.rsvpCount} / {event.capacity} attending
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 