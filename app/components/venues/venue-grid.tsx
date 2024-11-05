"use client"

import { VenueCard } from "./venue-card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Venue {
  id: string
  name: string
  location: string
  capacity: number
  genres: string[]
  imageUrl: string
  rating: number
  amenities: string[]
  isFavorite: boolean
  lastPlayed?: string
}

const venues: Venue[] = [
  {
    id: "1",
    name: "The Blue Note",
    location: "New York, NY",
    capacity: 250,
    genres: ["Jazz", "Blues"],
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    rating: 4.8,
    amenities: ["Stage", "Sound System", "Green Room", "Bar"],
    isFavorite: true,
    lastPlayed: "2024-02-15"
  },
  {
    id: "2",
    name: "Electric Ballroom",
    location: "Los Angeles, CA",
    capacity: 500,
    genres: ["Rock", "Electronic"],
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    rating: 4.5,
    amenities: ["Stage", "Sound System", "Lighting", "Bar", "Security"],
    isFavorite: false,
    lastPlayed: "2024-03-01"
  },
  // Add more venues...
]

interface VenueGridProps {
  filter?: "favorites" | "recent"
}

export function VenueGrid({ filter }: VenueGridProps) {
  const filteredVenues = venues.filter(venue => {
    if (filter === "favorites") return venue.isFavorite
    if (filter === "recent") return venue.lastPlayed
    return true
  })

  return (
    <ScrollArea className="h-[800px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onBook={() => {
              // Handle booking
            }}
          />
        ))}
      </div>
    </ScrollArea>
  )
} 