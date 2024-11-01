import { create } from 'zustand'
import { Booking } from '@/types/booking'

interface StoreState {
  bookings: Booking[]
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string | number, data: Partial<Booking>) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) => set((state) => ({ 
    bookings: [...state.bookings, booking] 
  })),
  updateBooking: (id, data) => set((state) => ({
    bookings: state.bookings.map(booking => 
      booking.id === id ? { ...booking, ...data } : booking
    )
  })),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
})) 