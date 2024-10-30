'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PosterGenerator } from "./PosterGenerator"
import { SocialMedia } from "./SocialMedia"
import { EmailCampaigns } from "./EmailCampaigns"

export function MarketingTabs() {
  return (
    <Tabs defaultValue="posters" className="space-y-4">
      <TabsList>
        <TabsTrigger value="posters">Event Posters</TabsTrigger>
        <TabsTrigger value="social">Social Media</TabsTrigger>
        <TabsTrigger value="email">Email Campaigns</TabsTrigger>
      </TabsList>

      <TabsContent value="posters">
        <PosterGenerator />
      </TabsContent>

      <TabsContent value="social">
        <SocialMedia />
      </TabsContent>

      <TabsContent value="email">
        <EmailCampaigns />
      </TabsContent>
    </Tabs>
  )
} 