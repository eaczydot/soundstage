'use client'

import { useEffect, useState } from 'react'
import { BookingsOverview } from "./BookingsOverview"
import { PaymentsOverview } from "./PaymentsOverview"
import { NotificationsCard } from "./NotificationsCard"
import { Card } from "@/components/ui/card"
import { RevenueChart } from "../analytics/RevenueChart"
import { useStore } from "@/store"

export function DashboardGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const { bookings, setBookings } = useStore()

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const mockBookings = [
          {
            id: 1,
            venue: "The Blue Note",
            date: "2024-03-20",
            time: "20:00",
            status: "confirmed",
            amount: 500,
          },
          {
            id: 2,
            venue: "Jazz Corner",
            date: "2024-03-25",
            time: "21:30",
            status: "pending",
            amount: 350,
          },
        ]
        setBookings(mockBookings)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [setBookings])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <BookingsOverview className="lg:col-span-2" />
      <PaymentsOverview className="lg:col-span-2" />
      <RevenueChart className="lg:col-span-3" />
      <NotificationsCard className="lg:col-span-1" />
    </div>
  )
} 