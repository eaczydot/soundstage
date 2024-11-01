import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Music, TrendingUp } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Bookings",
      value: "24",
      description: "+12% from last month",
      icon: Calendar,
    },
    {
      title: "Revenue",
      value: "$12,450",
      description: "+8% from last month",
      icon: DollarSign,
    },
    {
      title: "Performances",
      value: "18",
      description: "This month",
      icon: Music,
    },
    {
      title: "Growth",
      value: "+15%",
      description: "Year over year",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 