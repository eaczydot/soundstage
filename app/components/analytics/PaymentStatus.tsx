'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"

export function PaymentStatus() {
  const totalEarnings = 24000
  const pendingPayments = 8500
  const progress = ((totalEarnings - pendingPayments) / totalEarnings) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Total Earnings</p>
            <p className="text-2xl font-bold">{formatCurrency(totalEarnings)}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Pending Payments</p>
              <p className="font-medium">{formatCurrency(pendingPayments)}</p>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 