'use client'

import { BookingsOverview } from "./BookingsOverview"
import { PaymentsOverview } from "./PaymentsOverview"
import { NotificationsCard } from "./NotificationsCard"
import { Card } from "@/components/ui/card"
import { RevenueChart } from "../analytics/RevenueChart"

export function DashboardGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <BookingsOverview className="lg:col-span-2" />
      <PaymentsOverview className="lg:col-span-2" />
      <RevenueChart className="lg:col-span-3" />
      <NotificationsCard className="lg:col-span-1" />
    </div>
  )
} 