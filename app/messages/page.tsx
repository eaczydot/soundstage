import { MessagesHeader } from "@/components/messages/MessagesHeader"
import { MessagesList } from "@/components/messages/MessagesList"
import { MessagesView } from "@/components/messages/MessagesView"

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6">
      <MessagesHeader />
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        <div className="col-span-4 border rounded-lg">
          <MessagesList />
        </div>
        <div className="col-span-8 border rounded-lg">
          <MessagesView />
        </div>
      </div>
    </div>
  )
} 