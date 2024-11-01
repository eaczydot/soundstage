import { Booking, BookingFormData } from "@/types/booking"
import { fetchApi } from "./api"

export async function getBookings(): Promise<Booking[]> {
  // For now, return mock data
  return [
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
}

export async function createBooking(data: BookingFormData): Promise<Booking> {
  // In a real app, this would be an API call
  return {
    id: Date.now(),
    ...data,
    status: "pending",
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const bookings = await getBookings()
  return bookings.find(booking => booking.id.toString() === id) || null
}

export async function updateBooking(id: string | number, data: Partial<Booking>): Promise<Booking> {
  // In a real app, this would be an API call
  return {
    id,
    venue: "Updated Venue",
    date: "2024-03-20",
    time: "20:00",
    status: "confirmed",
    ...data,
  }
} 