"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Clock, Users, MoreVertical, Music } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate, formatCurrency } from "@/lib/utils"

interface Performance {
  id: string
  title: string
  venue: {
    name: string
    location: string
    image?: string
  }
  date: string
  time: string
  duration: string
  capacity: number
  genre: string
  fee: number
  status: "confirmed" | "pending" | "cancelled"
}

const performances: Performance[] = [
  {
    id: "1",
    title: "Jazz Night",
    venue: {
      name: "Blue Note",
      location: "New York, NY",
      image: "/venues/blue-note.jpg"
    },
    date: "2024-03-20",
    time: "20:00",
    duration: "3 hours",
    capacity: 250,
    genre: "Jazz",
    fee: 1500,
    status: "confirmed"
  },
  // Add more performances...
]

interface PerformanceListProps {
  type: "upcoming" | "past"
}

export function PerformanceList({ type }: PerformanceListProps) {
  const filteredPerformances = performances.filter(performance => {
    const performanceDate = new Date(performance.date)
    const now = new Date()
    return type === "upcoming" ? performanceDate > now : performanceDate <= now
  })

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {filteredPerformances.map((performance) => (
          <Card key={performance.id}>
            <CardContent className="flex items-start space-x-4 p-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={performance.venue.image} />
                <AvatarFallback>{performance.venue.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{performance.title}</h3>
                  <Badge variant={
                    performance.status === "confirmed" ? "success" :
                    performance.status === "pending" ? "warning" : "destructive"
                  }>
                    {performance.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{performance.venue.name}, {performance.venue.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(performance.date)} at {performance.time} ({performance.duration})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Capacity: {performance.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Music className="h-4 w-4" />
                    <span>{performance.genre}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="font-medium">{formatCurrency(performance.fee)}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Performance</DropdownMenuItem>
                      <DropdownMenuItem>Contact Venue</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel Performance
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
} 