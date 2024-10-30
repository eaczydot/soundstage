import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingTabs } from "@/components/marketing/MarketingTabs"

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-6">
      <MarketingHeader />
      <MarketingTabs />
    </div>
  )
} 