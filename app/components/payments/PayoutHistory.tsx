'use client'

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PayoutRecord {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export function PayoutHistory() {
  const payouts: PayoutRecord[] = [
    {
      id: "1",
      date: "2024-02-15",
      amount: 1500,
      status: "completed",
      reference: "PAY-123456",
    },
    {
      id: "2",
      date: "2024-02-01",
      amount: 1200,
      status: "completed",
      reference: "PAY-123457",
    },
    {
      id: "3",
      date: "2024-01-15",
      amount: 900,
      status: "completed",
      reference: "PAY-123458",
    },
  ]

  const getStatusColor = (status: PayoutRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'failed':
        return 'destructive'
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Payout History</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>
                {new Date(payout.date).toLocaleDateString()}
              </TableCell>
              <TableCell>${payout.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(payout.status)}>
                  {payout.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {payout.reference}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
} 