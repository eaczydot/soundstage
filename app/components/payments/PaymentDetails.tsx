'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, Clock, FileText, Download } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PaymentDetailsProps {
  bookingId: string
}

export function PaymentDetails({ bookingId }: PaymentDetailsProps) {
  const payment = {
    amount: 500,
    status: 'pending',
    dueDate: '2024-03-25',
    method: 'Bank Transfer',
    breakdown: {
      base: 450,
      fees: 50,
      tax: 0
    },
    progress: 70
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <Badge variant={
              payment.status === 'completed' ? 'success' :
              payment.status === 'pending' ? 'warning' :
              'destructive'
            }>
              {payment.status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Total Amount</span>
              </div>
              <span className="font-bold">${payment.amount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Due Date</span>
              </div>
              <span>{new Date(payment.dueDate).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Payment Method</span>
              </div>
              <span>{payment.method}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Payment Progress</span>
              <span>{payment.progress}%</span>
            </div>
            <Progress value={payment.progress} className="h-2" />
          </div>

          <Button className="w-full">Process Payment</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Payment Breakdown</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Amount</span>
              <span>${payment.breakdown.base}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fees</span>
              <span>${payment.breakdown.fees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${payment.breakdown.tax}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${payment.amount}</span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </Card>
    </div>
  )
} 