"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Bookings",
    value: "24",
    period: "/ month",
    trend: "+12%",
    trendUp: true
  },
  {
    title: "Revenue",
    value: "$12,450",
    period: "/ month",
    trend: "+8%",
    trendUp: true
  },
  {
    title: "Performances",
    value: "18",
    period: "/ month",
    trend: "0%",
    trendUp: false
  },
  {
    title: "Growth",
    value: "+15%",
    period: "/ year",
    trend: "+24.5%",
    trendUp: true
  }
]

export function StatsCards() {
  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {stat.title}
              </p>
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </h2>
                {stat.trend && (
                  <span className={cn(
                    "text-xs font-medium",
                    stat.trendUp ? "text-green-500" : "text-muted-foreground"
                  )}>
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.period}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  )
} 