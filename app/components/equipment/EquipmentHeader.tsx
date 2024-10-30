import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function EquipmentHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Equipment</h1>
        <p className="text-muted-foreground">
          Manage your equipment inventory and stage setups
        </p>
      </div>
      <div className="flex gap-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
      </div>
    </div>
  )
} 