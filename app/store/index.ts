import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Booking, Venue, Equipment } from '@/types'

interface AppState {
  user: User | null
  bookings: Booking[]
  venues: Venue[]
  equipment: Equipment[]
  loading: {
    bookings: boolean
    venues: boolean
    equipment: boolean
  }
  error: {
    bookings?: string
    venues?: string
    equipment?: string
  }
  // Actions
  setUser: (user: User | null) => void
  setBookings: (bookings: Booking[]) => void
  addBooking: (booking: Booking) => void
  updateBooking: (id: string, booking: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  setVenues: (venues: Venue[]) => void
  setEquipment: (equipment: Equipment[]) => void
  setLoading: (key: keyof AppState['loading'], value: boolean) => void
  setError: (key: keyof AppState['error'], value: string | undefined) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      bookings: [],
      venues: [],
      equipment: [],
      loading: {
        bookings: false,
        venues: false,
        equipment: false,
      },
      error: {},

      setUser: (user) => set({ user }),
      
      setBookings: (bookings) => set({ bookings }),
      addBooking: (booking) => 
        set((state) => ({ bookings: [...state.bookings, booking] })),
      updateBooking: (id, booking) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...booking } : b
          ),
        })),
      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        })),

      setVenues: (venues) => set({ venues }),
      setEquipment: (equipment) => set({ equipment }),
      
      setLoading: (key, value) =>
        set((state) => ({
          loading: { ...state.loading, [key]: value },
        })),
      setError: (key, value) =>
        set((state) => ({
          error: { ...state.error, [key]: value },
        })),
    }),
    {
      name: 'musician-venue-storage',
      partialize: (state) => ({
        user: state.user,
        venues: state.venues,
        equipment: state.equipment,
      }),
    }
  )
) 