"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { MessageComposer } from "./message-composer"
import { MessageDetail } from "./message-detail"
import { useMessageStore, type Message } from "@/store/message-store"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface MessageThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  message: Message
  onClose: () => void
}

export function MessageThread({ message, onClose, className, ...props }: MessageThreadProps) {
  const [isReplying, setIsReplying] = useState(false)
  const messages = useMessageStore((state) => state.messages)
  
  // Get all messages in the thread
  const threadMessages = messages.filter(
    (msg) => msg.threadId === message.threadId || msg.id === message.id
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Thread: {message.subject}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-4 p-4">
            {threadMessages.map((msg, index) => (
              <div key={msg.id}>
                <MessageDetail 
                  message={msg}
                  onReply={() => setIsReplying(true)}
                  className="border-0 shadow-none"
                />
                {index < threadMessages.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {isReplying && (
          <div className="border-t p-4">
            <MessageComposer
              recipientId={message.senderId}
              onClose={() => setIsReplying(false)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
} 