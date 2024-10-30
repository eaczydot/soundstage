'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp, Users } from "lucide-react"

interface DateRecommendation {
  id: string
  date: string
  time: string
  score: number
  reason: string
  expectedAttendance: number
  competingEvents: number
  historicalData?: {
    averageAttendance: number
    trend: 'up' | 'down'
    trendValue: string
  }
}

export function DateRecommendations() {
  const recommendations: DateRecommendation[] = [
    {
      id: "1",
      date: "2024-03-20",
      time: "20:00",
      score: 95,
      reason: "Historically high attendance for jazz events on Wednesday nights",
      expectedAttendance: 150,
      competingEvents: 1,
      historicalData: {
        averageAttendance: 130,
        trend: 'up',
        trendValue: '+15%'
      }
    },
    {
      id: "2",
      date: "2024-03-22",
      time: "21:30",
      score: 88,
      reason: "Popular time slot with minimal competing events",
      expectedAttendance: 120,
      competingEvents: 0,
      historicalData: {
        averageAttendance: 110,
        trend: 'up',
        trendValue: '+8%'
      }
    }
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

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 border rounded-lg space-y-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(rec.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{rec.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{rec.score}% match</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Expected: {rec.expectedAttendance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{rec.competingEvents} competing events</span>
                </div>
              </div>

              {rec.historicalData && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span>Historical Average: {rec.historicalData.averageAttendance}</span>
                    <span className={rec.historicalData.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {rec.historicalData.trendValue}
                    </span>
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <strong>Why this date:</strong> {rec.reason}
              </div>

              <Button className="w-full">
                Schedule Event
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
} 