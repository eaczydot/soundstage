import { RevenueChart } from "./revenue-chart"
import { BookingsChart } from "./bookings-chart"
import { PerformanceMetrics } from "./performance-metrics"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <PerformanceMetrics />
      <div className="grid gap-8 md:grid-cols-2">
        <RevenueChart />
        <BookingsChart />
      </div>
    </div>
  )
} 