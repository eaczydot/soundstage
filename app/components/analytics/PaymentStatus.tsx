'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PaymentStatus() {
  const paymentStats = {
    total: 12000,
    paid: 8500,
    pending: 2500,
    overdue: 1000,
    trend: '+15%'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Total Revenue</p>
            <p className="text-2xl font-bold">${paymentStats.total}</p>
          </div>
          <div className="flex items-center text-sm text-green-500">
            <ArrowUpRight className="mr-1 h-4 w-4" />
            {paymentStats.trend}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Paid</span>
              <span className="font-medium">${paymentStats.paid}</span>
            </div>
            <Progress value={70} className="bg-muted h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Pending</span>
              <span className="font-medium">${paymentStats.pending}</span>
            </div>
            <Progress value={20} className="bg-muted h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overdue</span>
              <span className="font-medium text-red-500">${paymentStats.overdue}</span>
            </div>
            <Progress value={10} className="bg-muted h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 