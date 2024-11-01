"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin } from "lucide-react"

interface UpcomingPerformancesProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockPerformances = [
  {
    id: 1,
    venue: "The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    location: "New York, NY",
    status: "confirmed",
  },
  {
    id: 2,
    venue: "Jazz Corner",
    date: "2024-03-25",
    time: "21:00",
    location: "Chicago, IL",
    status: "pending",
  },
  // Add more mock data...
]

export function UpcomingPerformances({ className, ...props }: UpcomingPerformancesProps) {
  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <CardTitle>Upcoming Performances</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockPerformances.map((performance) => (
              <div
                key={performance.id}
                className="flex items-center justify-between space-x-4 rounded-lg border p-4"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{performance.venue}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {performance.date}
                    <Clock className="ml-3 mr-1 h-4 w-4" />
                    {performance.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {performance.location}
                  </div>
                </div>
                <Badge
                  variant={performance.status === "confirmed" ? "default" : "secondary"}
                >
                  {performance.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 