"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { venue: 'Blue Note', bookings: 12 },
  { venue: 'Jazz Corner', bookings: 8 },
  { venue: 'Village Vanguard', bookings: 15 },
  { venue: 'Smalls', bookings: 10 },
  { venue: 'Birdland', bookings: 7 },
]

export function BookingsChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Bookings by Venue</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="venue" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="bookings" 
              fill="#2563eb" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
} 