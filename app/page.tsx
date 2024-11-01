import { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export const metadata: Metadata = {
  title: "Dashboard | Soundstage",
  description: "Manage your music performances and venue bookings",
}

export default function DashboardPage() {
  return <DashboardLayout />
} 