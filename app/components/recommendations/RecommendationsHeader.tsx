import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Calendar, ArrowDownToLine } from "lucide-react"

export function RecommendationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recommendations</h1>
        <p className="text-muted-foreground">
          AI-powered suggestions to optimize your performance schedule
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="venues">Venues</SelectItem>
            <SelectItem value="dates">Dates</SelectItem>
            <SelectItem value="setups">Setups</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Get New Suggestions
        </Button>
      </div>
    </div>
  )
} 