"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { ContractStatus } from "@/components/dashboard/contract-status"
import { UpcomingPerformances } from "@/components/dashboard/upcoming-performances"
import { NotificationsCard } from "@/components/dashboard/NotificationsCard"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-2">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        <StatsCards />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-2">
        {/* Left Column */}
        <div className="col-span-8 space-y-2">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Contract Status</h2>
            <ContractStatus />
          </Card>
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Upcoming Performances</h2>
            <UpcomingPerformances />
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          <Card className="p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                2 new
              </span>
            </div>
            <NotificationsCard />
          </Card>
        </div>
      </div>
    </div>
  )
}
