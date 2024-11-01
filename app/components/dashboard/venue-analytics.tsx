"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from "@/lib/utils"

interface VenueAnalyticsProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockData = [
  { venue: 'Blue Note', bookings: 12, revenue: 24000 },
  { venue: 'Jazz Corner', bookings: 8, revenue: 16000 },
  { venue: 'Village Vanguard', bookings: 15, revenue: 30000 },
  { venue: 'Smalls', bookings: 10, revenue: 20000 },
  { venue: 'Birdland', bookings: 7, revenue: 14000 },
]

export function VenueAnalytics({ className, ...props }: VenueAnalyticsProps) {
  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <CardTitle>Venue Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="venue" />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Bar 
                yAxisId="left"
                dataKey="bookings" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="revenue" 
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 