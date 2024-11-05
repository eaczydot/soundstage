"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { BookingsCalendar } from "@/components/bookings/BookingsCalendar"
import { BookingForm } from "@/components/bookings/booking-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <BookingForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <BookingsCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
} 