import { RecommendationsHeader } from "@/components/recommendations/RecommendationsHeader"
import { VenueRecommendations } from "@/components/recommendations/VenueRecommendations"
import { DateRecommendations } from "@/components/recommendations/DateRecommendations"
import { SetupRecommendations } from "@/components/recommendations/SetupRecommendations"

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <RecommendationsHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <VenueRecommendations />
        <DateRecommendations />
        <SetupRecommendations className="md:col-span-2" />
      </div>
    </div>
  )
} 