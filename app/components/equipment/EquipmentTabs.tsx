'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryList } from "./InventoryList"
import { SetupTemplates } from "./SetupTemplates"
import { VenueEquipment } from "./VenueEquipment"

export function EquipmentTabs() {
  return (
    <Tabs defaultValue="inventory" className="space-y-4">
      <TabsList>
        <TabsTrigger value="inventory">My Inventory</TabsTrigger>
        <TabsTrigger value="templates">Setup Templates</TabsTrigger>
        <TabsTrigger value="venues">Venue Equipment</TabsTrigger>
      </TabsList>

      <TabsContent value="inventory">
        <InventoryList />
      </TabsContent>

      <TabsContent value="templates">
        <SetupTemplates />
      </TabsContent>

      <TabsContent value="venues">
        <VenueEquipment />
      </TabsContent>
    </Tabs>
  )
} 