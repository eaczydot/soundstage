"use client"

import { TaskList } from "@/components/dashboard/task-list"
import { MessageInbox } from "@/components/dashboard/message-inbox"
import { PaymentStatus } from "@/components/dashboard/payment-status"
import { UpcomingPerformances } from "@/components/dashboard/upcoming-performances"

export function DashboardLayout() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UpcomingPerformances className="col-span-4" />
        <TaskList className="col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <MessageInbox className="col-span-4" />
        <PaymentStatus className="col-span-3" />
      </div>
    </div>
  )
} 