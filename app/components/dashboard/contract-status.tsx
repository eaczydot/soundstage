"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { FileText, DollarSign, AlertCircle } from "lucide-react"

interface ContractStatusProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockContracts = [
  {
    id: 1,
    venue: "The Blue Note",
    type: "Performance",
    value: "$2,400",
    status: "pending_signature",
    dueDate: "2024-03-18",
  },
  {
    id: 2,
    venue: "Jazz Corner",
    type: "Residency",
    value: "$4,800",
    status: "pending_review",
    dueDate: "2024-03-20",
  },
  {
    id: 3,
    venue: "Village Vanguard",
    type: "Special Event",
    value: "$3,200",
    status: "pending_payment",
    dueDate: "2024-03-25",
  },
]

const getStatusDetails = (status: string) => {
  switch (status) {
    case "pending_signature":
      return {
        label: "Pending Signature",
        variant: "warning" as const,
        icon: FileText,
      }
    case "pending_review":
      return {
        label: "Under Review",
        variant: "secondary" as const,
        icon: AlertCircle,
      }
    case "pending_payment":
      return {
        label: "Awaiting Payment",
        variant: "default" as const,
        icon: DollarSign,
      }
    default:
      return {
        label: "Unknown",
        variant: "secondary" as const,
        icon: AlertCircle,
      }
  }
}

export function ContractStatus({ className, ...props }: ContractStatusProps) {
  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Contract Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockContracts.map((contract) => {
              const status = getStatusDetails(contract.status)
              return (
                <div
                  key={contract.id}
                  className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{contract.venue}</h3>
                      <Badge variant="outline">{contract.type}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <status.icon className="mr-1 h-4 w-4" />
                      Due: {contract.dueDate}
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {contract.value}
                    </div>
                  </div>
                  <Badge variant={status.variant}>
                    {status.label}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 