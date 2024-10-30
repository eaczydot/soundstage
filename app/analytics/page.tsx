import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader"
import { BookingMetrics } from "@/components/analytics/BookingMetrics"
import { RevenueChart } from "@/components/analytics/RevenueChart"
import { PaymentStatus } from "@/components/analytics/PaymentStatus"
import { VenueAnalytics } from "@/components/analytics/VenueAnalytics"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <AnalyticsHeader />
      <div className="grid gap-6 grid-cols-4">
        <BookingMetrics />
      </div>
      <div className="grid gap-6 grid-cols-2">
        <RevenueChart />
        <PaymentStatus />
      </div>
      <VenueAnalytics />
    </div>
  )
} 