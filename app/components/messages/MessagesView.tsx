'use client'

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip, Send, Image as ImageIcon, File } from "lucide-react"
import { formatRelative } from "@/lib/date"

interface Message {
  id: string
  content: string
  timestamp: string
  sender: {
    id: string
    name: string
    avatar?: string
  }
  attachments?: {
    type: 'image' | 'file'
    url: string
    name: string
  }[]
}

export function MessagesView() {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi, I'd like to discuss the setup for next week's performance.",
      timestamp: "2024-02-20T10:25:00",
      sender: {
        id: "venue1",
        name: "The Blue Note",
      },
    },
    {
      id: "2",
      content: "Sure! I'll need about an hour for soundcheck. Is 6 PM okay?",
      timestamp: "2024-02-20T10:28:00",
      sender: {
        id: "user1",
        name: "John Doe",
      },
      attachments: [
        {
          type: 'file',
          url: '/stage-plot.pdf',
          name: 'Stage Plot.pdf'
        }
      ]
    },
  ])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: {
        id: "user1",
        name: "John Doe",
      },
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/venues/blue-note.jpg" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">The Blue Note</h2>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.id === "user1" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] space-y-2 ${
                  message.sender.id === "user1"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } rounded-lg p-3`}
              >
                <p className="text-sm">{message.content}</p>
                {message.attachments?.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-background/10 rounded"
                  >
                    {attachment.type === 'image' ? (
                      <ImageIcon className="h-4 w-4" />
                    ) : (
                      <File className="h-4 w-4" />
                    )}
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                ))}
                <p className="text-xs opacity-70">
                  {formatRelative(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 