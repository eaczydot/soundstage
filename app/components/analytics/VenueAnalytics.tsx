'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react"

interface VenuePerformance {
  name: string
  bookings: number
  revenue: number
  averageRate: number
  trend: 'up' | 'down'
  trendValue: string
  rating: number
}

export function VenueAnalytics() {
  const venues: VenuePerformance[] = [
    {
      name: "The Blue Note",
      bookings: 12,
      revenue: 4200,
      averageRate: 350,
      trend: 'up',
      trendValue: '+15%',
      rating: 4.8,
    },
    {
      name: "Jazz Corner",
      bookings: 8,
      revenue: 2800,
      averageRate: 350,
      trend: 'down',
      trendValue: '-5%',
      rating: 4.6,
    },
    {
      name: "The Velvet Room",
      bookings: 6,
      revenue: 2100,
      averageRate: 350,
      trend: 'up',
      trendValue: '+8%',
      rating: 4.7,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Avg. Rate</TableHead>
              <TableHead className="text-right">Trend</TableHead>
              <TableHead className="text-right">Rating</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {venues.map((venue) => (
              <TableRow key={venue.name}>
                <TableCell className="font-medium">{venue.name}</TableCell>
                <TableCell className="text-right">{venue.bookings}</TableCell>
                <TableCell className="text-right">${venue.revenue}</TableCell>
                <TableCell className="text-right">${venue.averageRate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {venue.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={venue.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {venue.trendValue}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{venue.rating}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 