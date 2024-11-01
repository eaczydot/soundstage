"use client"

import { useState } from "react"
import { MessageList } from "@/components/messages/message-list"
import { MessageThread } from "@/components/messages/message-thread"
import { MessageComposer } from "@/components/messages/message-composer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { Message } from "@/store/message-store"

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <MessageComposer recipientId="" />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4">
        {selectedMessage ? (
          <MessageThread
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
          />
        ) : (
          <MessageList
            onSelect={setSelectedMessage}
          />
        )}
      </div>
    </div>
  )
} 