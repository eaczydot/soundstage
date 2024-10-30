'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRelative } from "@/lib/date"

interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export function MessagesList() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const conversations: Conversation[] = [
    {
      id: "1",
      name: "The Blue Note",
      lastMessage: "Great, see you at the soundcheck!",
      timestamp: "2024-02-20T10:30:00",
      unread: true,
    },
    {
      id: "2",
      name: "Jazz Corner",
      lastMessage: "Can you send over the stage plot?",
      timestamp: "2024-02-19T15:45:00",
      unread: false,
    },
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/50 border-b",
              selectedId === conversation.id && "bg-muted",
              conversation.unread && "bg-muted/30"
            )}
            onClick={() => setSelectedId(conversation.id)}
          >
            <Avatar>
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">{conversation.name}</p>
                <span className="text-xs text-muted-foreground">
                  {formatRelative(conversation.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
} 