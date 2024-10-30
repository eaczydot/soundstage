import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { DashboardGrid } from "@/components/dashboard/DashboardGrid"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardGrid />
    </div>
  )
} 