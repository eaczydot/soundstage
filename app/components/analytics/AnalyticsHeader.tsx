import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, Share2 } from "lucide-react"

export function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your performance metrics and insights
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Report
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  )
} 