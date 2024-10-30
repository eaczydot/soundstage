'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Clock, TrendingUp, Users } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

interface DateSuggestion {
  date: Date
  time: string
  confidence: number
  reason: string
  expectedAttendance: number
  historicalData?: {
    previousBookings: number
    averageAttendance: number
  }
}

export function DateRecommendations() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const suggestions: DateSuggestion[] = [
    {
      date: new Date('2024-04-15'),
      time: '20:00',
      confidence: 92,
      reason: "High attendance rates for jazz performances on Monday nights",
      expectedAttendance: 180,
      historicalData: {
        previousBookings: 12,
        averageAttendance: 165,
      },
    },
    {
      date: new Date('2024-04-20'),
      time: '21:30',
      confidence: 88,
      reason: "Popular time slot with your target demographic",
      expectedAttendance: 150,
      historicalData: {
        previousBookings: 8,
        averageAttendance: 145,
      },
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended Dates</h2>
          <Badge variant="secondary" className="font-normal">
            Based on historical data
          </Badge>
        </div>

        <div className="flex gap-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="border rounded-md"
          />

          <div className="space-y-4 flex-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-3 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {suggestion.date.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{suggestion.time}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-normal">
                    {suggestion.confidence}% match
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Expected: {suggestion.expectedAttendance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Avg: {suggestion.historicalData?.averageAttendance}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {suggestion.reason}
                </p>

                <Button className="w-full" variant="outline">
                  Check Venue Availability
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
} 