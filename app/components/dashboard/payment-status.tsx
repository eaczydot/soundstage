"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileText, DollarSign, AlertCircle } from "lucide-react"

interface PaymentStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockPayments = [
  {
    id: 1,
    venue: "Blue Note NYC",
    amount: 2400,
    date: "2024-03-15",
    status: "paid",
    taxDocument: "1099",
    taxDocumentStatus: "ready"
  },
  {
    id: 2,
    venue: "Jazz Corner",
    amount: 1800,
    date: "2024-03-10",
    status: "pending",
    taxDocument: "1099",
    taxDocumentStatus: "processing"
  },
  {
    id: 3,
    venue: "Village Vanguard",
    amount: 3200,
    date: "2024-03-05",
    status: "paid",
    taxDocument: "1099",
    taxDocumentStatus: "ready"
  }
]

const statusColors = {
  paid: "text-green-500",
  pending: "text-yellow-500",
  overdue: "text-destructive"
}

const statusIcons = {
  ready: Download,
  processing: AlertCircle,
  pending: FileText
}

export function PaymentStatus({ className, ...props }: PaymentStatusProps) {
  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payment Status & Tax Documents</CardTitle>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate 1099s
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockPayments.map((payment) => {
              const StatusIcon = statusIcons[payment.taxDocumentStatus as keyof typeof statusIcons]
              return (
                <div
                  key={payment.id}
                  className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <DollarSign className={cn(
                        "h-4 w-4",
                        statusColors[payment.status as keyof typeof statusColors]
                      )} />
                      <span className="font-medium">{payment.venue}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {payment.date} • ${payment.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={payment.status === "paid" ? "default" : "secondary"}
                    >
                      {payment.status}
                    </Badge>
                    {payment.taxDocumentStatus === "ready" ? (
                      <Button variant="ghost" size="icon">
                        <StatusIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <StatusIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 