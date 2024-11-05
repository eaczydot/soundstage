"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceCalendar } from "@/components/performances/performance-calendar"
import { PerformanceList } from "@/components/performances/performance-list"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { PerformanceForm } from "@/components/performances/performance-form"

export default function PerformancesPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Performances</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Performance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <PerformanceForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <PerformanceList type="upcoming" />
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <PerformanceList type="past" />
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <PerformanceCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
} 