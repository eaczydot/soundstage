import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function EventsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <p className="text-muted-foreground">
          Browse and manage upcoming performances
        </p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Event
      </Button>
    </div>
  )
} 