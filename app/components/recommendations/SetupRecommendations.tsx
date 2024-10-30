'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Users, Star, ArrowRight } from "lucide-react"

interface SetupRecommendation {
  id: string
  name: string
  matchScore: number
  genre: string
  audienceSize: string
  equipment: string[]
  reason: string
}

export function SetupRecommendations() {
  const recommendations: SetupRecommendation[] = [
    {
      id: "1",
      name: "Jazz Quartet Standard",
      matchScore: 95,
      genre: "Jazz",
      audienceSize: "100-200",
      equipment: [
        "Grand Piano",
        "Drum Kit",
        "Bass Amp",
        "Stage Monitors",
      ],
      reason: "Matches your most successful past performances",
    },
    {
      id: "2",
      name: "Intimate Trio Setup",
      matchScore: 88,
      genre: "Jazz/Blues",
      audienceSize: "50-100",
      equipment: [
        "Upright Piano",
        "Minimal Drum Kit",
        "Bass Amp",
      ],
      reason: "Optimized for smaller venues with great acoustics",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended Setups</h2>
          <Badge variant="secondary" className="font-normal">
            Based on venue size and genre
          </Badge>
        </div>

        <div className="space-y-4">
          {recommendations.map((setup) => (
            <div
              key={setup.id}
              className="p-4 border rounded-lg space-y-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{setup.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Music className="h-4 w-4" />
                    <span>{setup.genre}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{setup.matchScore}% match</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Ideal for {setup.audienceSize} attendees</span>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Required Equipment:</p>
                <div className="flex flex-wrap gap-2">
                  {setup.equipment.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Why this setup:</strong> {setup.reason}
              </div>

              <Button className="w-full">
                Use This Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 