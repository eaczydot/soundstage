"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"

interface MetricProps {
  title: string
  value: string | number
  description: string
  progress?: number
}

function MetricCard({ title, value, description, progress }: MetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  )
}

export function PerformanceMetrics() {
  const metrics = [
    {
      title: "Average Booking Rate",
      value: formatCurrency(350),
      description: "Per performance",
      progress: 78
    },
    {
      title: "Booking Success Rate",
      value: "85%",
      description: "Last 30 days",
      progress: 85
    },
    {
      title: "Repeat Venues",
      value: "12",
      description: "Regular bookings",
      progress: 65
    },
    {
      title: "Revenue Growth",
      value: "+24%",
      description: "Year over year",
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