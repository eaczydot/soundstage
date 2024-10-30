'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react"
import { useStore } from "@/store"

export function BookingMetrics() {
  const bookings = useStore((state) => state.bookings)

  const metrics = [
    {
      title: "Total Bookings",
      value: bookings.length.toString(),
      change: "+12.5%",
      icon: Calendar,
      description: "vs. last month"
    },
    {
      title: "Average Rate",
      value: "$350",
      change: "+2.1%",
      icon: DollarSign,
      description: "per performance"
    },
    {
      title: "Unique Venues",
      value: "15",
      change: "+4",
      icon: MapPin,
      description: "new venues"
    },
    {
      title: "Acceptance Rate",
      value: "89%",
      change: "+5.2%",
      icon: TrendingUp,
      description: "acceptance rate"
    }
  ]

  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
              {' '}{metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
} 