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
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface PayoutRecord {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  method: string
  reference: string
}

export function PayoutHistory() {
  const payouts: PayoutRecord[] = [
    {
      id: "1",
      date: "2024-03-15",
      amount: 1500,
      status: "completed",
      method: "Bank Transfer",
      reference: "PAY-2024-001",
    },
    {
      id: "2",
      date: "2024-03-01",
      amount: 2000,
      status: "completed",
      method: "Bank Transfer",
      reference: "PAY-2024-002",
    },
    {
      id: "3",
      date: "2024-02-15",
      amount: 1750,
      status: "completed",
      method: "Bank Transfer",
      reference: "PAY-2024-003",
    },
  ]

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Payout History</h2>
          <p className="text-sm text-muted-foreground">
            View your past payouts and download statements
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.map((payout) => (
              <TableRow key={payout.id}>
                <TableCell>
                  {new Date(payout.date).toLocaleDateString()}
                </TableCell>
                <TableCell>${payout.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payout.status === "completed"
                        ? "success"
                        : payout.status === "pending"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {payout.status}
                  </Badge>
                </TableCell>
                <TableCell>{payout.method}</TableCell>
                <TableCell>{payout.reference}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
} 