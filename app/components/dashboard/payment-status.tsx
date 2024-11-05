"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CompactProps } from "@/types/layout"
import { cn } from "@/lib/utils"
import { DollarSign, ArrowUpRight } from "lucide-react"

interface PaymentMetrics {
  totalEarnings: number
  pendingPayments: number
  completedPayments: number
  projectedEarnings: number
  percentageIncrease: number
}

export function PaymentStatus({ isCompact }: CompactProps) {
  const metrics: PaymentMetrics = {
    totalEarnings: 24000,
    pendingPayments: 8500,
    completedPayments: 15500,
    projectedEarnings: 35000,
    percentageIncrease: 15
  }

  const completionPercentage = (metrics.completedPayments / metrics.totalEarnings) * 100

  return (
    <Card className="h-full">
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        isCompact ? "py-2" : "py-3"
      )}>
        <CardTitle className="text-lg font-medium">Payment Status</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={cn(
            "flex items-center rounded-full px-2 py-1",
            "text-green-500 bg-green-500/10"
          )}>
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span className="text-xs font-medium">
              {metrics.percentageIncrease}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn(
        isCompact ? "p-2" : "p-3"
      )}>
        <ScrollArea className="h-[calc(100%-2rem)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Total Earnings */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className={cn(
                  "font-medium",
                  isCompact ? "text-sm" : "text-base"
                )}>
                  Total Earnings
                </p>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="font-bold">
                    {metrics.totalEarnings.toLocaleString()}
                  </span>
                </div>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Completed: ${metrics.completedPayments.toLocaleString()}</span>
                <span>Pending: ${metrics.pendingPayments.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending Payments</span>
                <span className="font-medium">${metrics.pendingPayments.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completed Payments</span>
                <span className="font-medium">${metrics.completedPayments.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Projected Earnings</span>
                <span className="font-medium">${metrics.projectedEarnings.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Completed</p>
                <Progress value={65} className="h-1" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Pending</p>
                <Progress value={35} className="h-1" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Projected</p>
                <Progress value={85} className="h-1" />
              </div>
            </div>
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 