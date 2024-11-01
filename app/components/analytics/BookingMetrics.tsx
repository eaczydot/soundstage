'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Users, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface MetricProps {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  change?: string
  progress?: number
}

function MetricCard({ title, value, description, icon: Icon, change, progress }: MetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change && (
            <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {change}
            </span>
          )}
          <span className="ml-1">{description}</span>
        </div>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  )
}

export function BookingMetrics() {
  const metrics = [
    {
      title: "Total Bookings",
      value: "124",
      change: "+12%",
      icon: Calendar,
      description: "from last month",
      progress: 78
    },
    {
      title: "Active Venues",
      value: "15",
      change: "+4",
      icon: MapPin,
      description: "new venues"
    },
    {
      title: "Total Audience",
      value: "2.4K",
      change: "+18%",
      icon: Users,
      description: "attendees"
    },
    {
      title: "Growth Rate",
      value: "+24.5%",
      icon: TrendingUp,
      description: "year over year",
      progress: 24
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
} 