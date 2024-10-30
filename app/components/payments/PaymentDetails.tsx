'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Download, Clock, CheckCircle } from "lucide-react"

interface PaymentDetailsProps {
  bookingId: string
}

export function PaymentDetails({ bookingId }: PaymentDetailsProps) {
  const paymentDetails = {
    amount: 500,
    status: 'pending',
    dueDate: '2024-03-20',
    paymentMethod: 'Bank Transfer',
    invoiceNumber: 'INV-2024-001',
    breakdown: [
      { item: 'Performance Fee', amount: 450 },
      { item: 'Equipment Setup', amount: 50 },
    ]
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Payment Details</h3>
          <Badge variant={paymentDetails.status === 'paid' ? 'success' : 'warning'}>
            {paymentDetails.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Total Amount</p>
                <p className="text-2xl font-bold">${paymentDetails.amount}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Due Date</span>
              <span>{new Date(paymentDetails.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span>{paymentDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoice Number</span>
              <span>{paymentDetails.invoiceNumber}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Payment Breakdown</p>
            {paymentDetails.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.item}</span>
                <span>${item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <DollarSign className="mr-2 h-4 w-4" />
            Process Payment
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold">Payment Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Contract Signed</p>
              <p className="text-sm text-muted-foreground">March 15, 2024</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Payment Due</p>
              <p className="text-sm text-muted-foreground">March 20, 2024</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 