import { PayoutScheduling } from "@/components/payments/PayoutScheduling"
import { PayoutHistory } from "@/components/payments/PayoutHistory"

export default function PayoutSchedulingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payout Settings</h1>
        <p className="text-muted-foreground">
          Configure your payment schedule and view payout history
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <PayoutScheduling />
        <PayoutHistory />
      </div>
    </div>
  )
} 