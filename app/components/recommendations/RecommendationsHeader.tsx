import { Sparkles } from "lucide-react"

export function RecommendationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Smart Recommendations</h1>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-muted-foreground">
          AI-powered suggestions to optimize your bookings and performances
        </p>
      </div>
    </div>
  )
} 