'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users, DollarSign, ArrowRight } from "lucide-react"

interface VenueMatch {
  id: string
  name: string
  location: string
  matchScore: number
  genres: string[]
  capacity: number
  averagePay: number
  reason: string
}

export function VenueRecommendations() {
  const venues: VenueMatch[] = [
    {
      id: "1",
      name: "The Jazz Room",
      location: "Brooklyn, NY",
      matchScore: 95,
      genres: ["Jazz", "Blues"],
      capacity: 200,
      averagePay: 500,
      reason: "Matches your musical style and past successful bookings",
    },
    {
      id: "2",
      name: "Rhythm House",
      location: "Manhattan, NY",
      matchScore: 88,
      genres: ["Jazz", "Fusion"],
      capacity: 150,
      averagePay: 450,
      reason: "Similar audience demographic to your top performing venues",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended Venues</h2>
          <Badge variant="secondary" className="font-normal">
            Based on your performance history
          </Badge>
        </div>

        <div className="space-y-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="p-4 border rounded-lg space-y-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{venue.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{venue.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{venue.matchScore}% match</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {venue.genres.map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{venue.capacity} capacity</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${venue.averagePay} avg. pay</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Why this venue:</strong> {venue.reason}
              </div>

              <Button className="w-full">
                Contact Venue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 