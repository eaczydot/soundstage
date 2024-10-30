import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function MessagesHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with venues and manage conversations
        </p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Message
      </Button>
    </div>
  )
} 