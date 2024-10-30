import { Booking } from "@/types/booking"

export async function getBookings(): Promise<Booking[]> {
  // In a real app, this would be an API call
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

export async function createBooking(bookingData: Partial<Booking>): Promise<Booking> {
  // In a real app, this would be an API call
  return {
    id: Date.now(),
    venue: bookingData.venue || "",
    date: bookingData.date || "",
    time: bookingData.time || "",
    status: "pending",
  }
} 