'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Star, MapPin, Music, X } from "lucide-react"

interface Venue {
  id: string
  name: string
  location: string
  genre: string
  rating: number
  matchScore: number
}

export function VenueRecommendations() {
  const [isVisible, setIsVisible] = useState(true)
  const [venues] = useState<Venue[]>([
    {
      id: '1',
      name: 'Blue Note',
      location: 'New York, NY',
      genre: 'Jazz',
      rating: 4.8,
      matchScore: 95
    },
    {
      id: '2',
      name: 'Village Vanguard',
      location: 'New York, NY',
      genre: 'Jazz/Blues',
      rating: 4.9,
      matchScore: 92
    }
  ])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recommended Venues</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4 rounded-lg border p-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{venue.name}</p>
                        <Badge variant="secondary">
                          {venue.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {venue.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Music className="mr-1 h-4 w-4" />
                        {venue.genre}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        {venue.rating}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
} 