"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { VenueForm } from "@/components/venues/venue-form"
import { VenueGrid } from "@/components/venues/venue-grid"
import { VenueFilters } from "@/components/venues/venue-filters"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VenuesPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Venues</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Venue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <VenueForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all">All Venues</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recently Played</TabsTrigger>
            </TabsList>
          </div>
          <VenueFilters />
          <TabsContent value="all" className="space-y-4">
            <VenueGrid />
          </TabsContent>
          <TabsContent value="favorites" className="space-y-4">
            <VenueGrid filter="favorites" />
          </TabsContent>
          <TabsContent value="recent" className="space-y-4">
            <VenueGrid filter="recent" />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
} 