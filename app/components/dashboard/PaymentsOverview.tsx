import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface PaymentsOverviewProps {
  className?: string
  isLoading?: boolean
}

export function PaymentsOverview({ className, isLoading }: PaymentsOverviewProps) {
  if (isLoading) {
    return <Card className={cn(className)}>
      // Add loading skeleton
    </Card>
  }

  const recentPayments = [
    {
      id: 1,
      amount: 500,
      venue: "The Blue Note",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: 2,
      amount: 350,
      venue: "Jazz Corner",
      date: "2024-03-10",
      status: "pending",
    },
  ]

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Payment Overview</CardTitle>
        <CardDescription>Your recent and upcoming payments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Total Earnings</p>
              </div>
              <p className="text-2xl font-bold">$2,850.00</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium">Pending</p>
              </div>
              <p className="text-2xl font-bold">$350.00</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
} 