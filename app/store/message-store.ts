import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Attachment {
  id: string
  name: string
  type: string
  url: string
  size: number
}

export interface Message {
  id: string
  senderId: string
  recipientId: string
  subject: string
  content: string
  attachments: Attachment[]
  timestamp: string
  read: boolean
  starred: boolean
  threadId?: string
}

interface MessageState {
  messages: Message[]
  addMessage: (message: Message) => void
  markAsRead: (id: string) => void
  toggleStar: (id: string) => void
  deleteMessage: (id: string) => void
  addAttachment: (messageId: string, attachment: Attachment) => void
  removeAttachment: (messageId: string, attachmentId: string) => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [message, ...state.messages],
        })),
      markAsRead: (id) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, read: true } : msg
          ),
        })),
      toggleStar: (id) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, starred: !msg.starred } : msg
          ),
        })),
      deleteMessage: (id) =>
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        })),
      addAttachment: (messageId, attachment) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId
              ? { ...msg, attachments: [...msg.attachments, attachment] }
              : msg
          ),
        })),
      removeAttachment: (messageId, attachmentId) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  attachments: msg.attachments.filter((a) => a.id !== attachmentId),
                }
              : msg
          ),
        })),
    }),
    {
      name: 'message-storage',
    }
  )
) 