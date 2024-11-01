import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Message } from '@/store/message-store'

interface Notification {
  id: string
  type: 'message' | 'booking' | 'payment'
  title: string
  description: string
  timestamp: string
  read: boolean
  data?: any
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotifications = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).slice(2),
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearAll: () => set({ notifications: [] }),
    }),
    {
      name: 'notifications-storage',
    }
  )
)

// Hook to automatically create notifications for new messages
export function useMessageNotifications() {
  const addNotification = useNotifications((state) => state.addNotification)

  const handleNewMessage = (message: Message) => {
    addNotification({
      type: 'message',
      title: 'New Message',
      description: `From ${message.senderId}: ${message.subject}`,
      data: message,
    })
  }

  return { handleNewMessage }
} 