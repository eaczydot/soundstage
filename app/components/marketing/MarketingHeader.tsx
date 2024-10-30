import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar } from "lucide-react"

export function MarketingHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
        <p className="text-muted-foreground">
          Create and manage your promotional materials
        </p>
      </div>
      <div className="flex gap-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
    </div>
  )
} 