'use client'

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings2, Music, Speaker, Mic, Save } from "lucide-react"

interface SetupRecommendationsProps {
  className?: string
}

interface EquipmentRecommendation {
  id: string
  name: string
  type: string
  confidence: number
  reason: string
  alternatives?: string[]
  requirements?: string[]
}

export function SetupRecommendations({ className }: SetupRecommendationsProps) {
  const recommendations: Record<string, EquipmentRecommendation[]> = {
    instruments: [
      {
        id: "1",
        name: "Yamaha C7 Grand Piano",
        type: "Piano",
        confidence: 95,
        reason: "Most requested by venues in your circuit",
        requirements: ["Tuning required 2 hours before performance"],
      },
      {
        id: "2",
        name: "Fender Rhodes Stage 73",
        type: "Electric Piano",
        confidence: 88,
        reason: "Commonly available backup option",
        alternatives: ["Nord Stage 3", "Yamaha CP88"],
      },
    ],
    sound: [
      {
        id: "3",
        name: "JBL PRX835W",
        type: "PA System",
        confidence: 92,
        reason: "Optimal for venue sizes in your upcoming bookings",
        requirements: ["Minimum stage space: 8x6 feet"],
      },
      {
        id: "4",
        name: "Shure SM58",
        type: "Microphone",
        confidence: 90,
        reason: "Industry standard for your vocal style",
        alternatives: ["Sennheiser e935", "Audio-Technica AT2020"],
      },
    ],
    staging: [
      {
        id: "5",
        name: "Standard Jazz Quartet Layout",
        type: "Stage Plot",
        confidence: 94,
        reason: "Proven setup for optimal sound and audience engagement",
        requirements: ["Minimum stage size: 16x12 feet", "Direct sight lines between performers"],
      },
    ],
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Setup Recommendations</h2>
            <p className="text-sm text-muted-foreground">
              AI-optimized equipment and staging suggestions based on venue requirements
            </p>
          </div>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save as Template
          </Button>
        </div>

        <Tabs defaultValue="instruments">
          <TabsList>
            <TabsTrigger value="instruments">
              <Music className="mr-2 h-4 w-4" />
              Instruments
            </TabsTrigger>
            <TabsTrigger value="sound">
              <Speaker className="mr-2 h-4 w-4" />
              Sound System
            </TabsTrigger>
            <TabsTrigger value="staging">
              <Settings2 className="mr-2 h-4 w-4" />
              Stage Layout
            </TabsTrigger>
          </TabsList>

          {Object.entries(recommendations).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg space-y-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type}
                        </p>
                      </div>
                      <Badge variant="outline" className="font-normal">
                        {item.confidence}% match
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.reason}
                    </p>

                    {item.requirements && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Requirements:</p>
                        <ul className="text-sm space-y-1">
                          {item.requirements.map((req, index) => (
                            <li
                              key={index}
                              className="flex items-center text-muted-foreground"
                            >
                              • {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.alternatives && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Alternatives:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.alternatives.map((alt, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="font-normal"
                            >
                              {alt}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  )
} 