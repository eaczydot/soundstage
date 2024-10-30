'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

export function MessagesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  const contacts: Contact[] = [
    {
      id: "1",
      name: "The Blue Note",
      lastMessage: "Great, see you at soundcheck!",
      timestamp: "2024-03-15T10:30:00",
      unread: true,
    },
    {
      id: "2",
      name: "Jazz Corner",
      lastMessage: "Can we discuss the setlist?",
      timestamp: "2024-03-14T15:45:00",
      unread: false,
    },
  ]

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={cn(
                "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                selectedContact === contact.id && "bg-muted",
                contact.unread && "bg-muted/30"
              )}
              onClick={() => setSelectedContact(contact.id)}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(contact.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 