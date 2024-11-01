"use client"

import { useState } from "react"
import { useMessageStore, type Message } from "@/store/message-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Star, Paperclip } from "lucide-react"
import { cn, formatRelativeTime, getInitials } from "@/lib/utils"

interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelect: (message: Message) => void
  selectedId?: string
}

export function MessageList({ className, onSelect, selectedId, ...props }: MessageListProps) {
  const messages = useMessageStore((state) => state.messages)
  const toggleStar = useMessageStore((state) => state.toggleStar)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    switch (filter) {
      case "unread":
        return !message.read
      case "starred":
        return message.starred
      default:
        return true
    }
  })

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Messages</CardTitle>
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="unread" onClick={() => setFilter("unread")}>
                Unread
              </TabsTrigger>
              <TabsTrigger value="starred" onClick={() => setFilter("starred")}>
                Starred
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex w-full items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex cursor-pointer items-start space-x-4 rounded-lg border p-4",
                  message.read ? "bg-background" : "bg-accent/50",
                  selectedId === message.id && "ring-2 ring-primary",
                  "hover:bg-accent transition-colors"
                )}
                onClick={() => onSelect(message)}
              >
                <Avatar>
                  <AvatarImage src={`/avatars/${message.senderId}.png`} />
                  <AvatarFallback>{getInitials(message.senderId)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {message.senderId}
                    </p>
                    <div className="flex items-center gap-2">
                      {message.attachments.length > 0 && (
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(message.id)
                        }}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            message.starred
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                  <p className={cn(
                    "text-sm",
                    message.read ? "text-muted-foreground" : "font-medium"
                  )}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 