import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { BookingsOverview } from "@/components/dashboard/BookingsOverview"
import { PaymentsOverview } from "@/components/dashboard/PaymentsOverview"
import { NotificationsCard } from "@/components/dashboard/NotificationsCard"
import { DashboardGrid } from "@/components/dashboard/DashboardGrid"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardGrid>
        <BookingsOverview />
        <NotificationsCard />
        <PaymentsOverview />
      </DashboardGrid>
    </div>
  )
} 