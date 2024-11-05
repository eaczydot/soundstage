"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, formatRelativeTime } from "@/lib/utils"
import { Search } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  subject: string
  preview: string
  timestamp: string
  read: boolean
}

const messages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "John Doe",
    subject: "Booking Confirmation",
    preview: "Your performance at Blue Note has been confirmed for...",
    timestamp: "2024-03-15T10:00:00",
    read: false
  },
  {
    id: "2",
    senderId: "2",
    senderName: "Jane Smith",
    subject: "Contract Update",
    preview: "Please review the updated contract terms for...",
    timestamp: "2024-03-14T15:30:00",
    read: true
  },
  // Add more messages...
]

export function MessageList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedId, setSelectedId] = useState<string>()

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-4 p-4 hover:bg-accent cursor-pointer",
                message.id === selectedId && "bg-accent",
                !message.read && "font-medium"
              )}
              onClick={() => setSelectedId(message.id)}
            >
              <Avatar>
                <AvatarImage src={message.senderAvatar} />
                <AvatarFallback>{message.senderName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {message.senderName}
                </p>
                <p className="text-sm">{message.subject}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {message.preview}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 