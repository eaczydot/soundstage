"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Edit, Star, Archive, Trash2, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  sender: string
  avatar?: string
  subject: string
  preview: string
  time: string
  unread: boolean
  starred: boolean
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Blue Note NYC',
      subject: 'Tech Requirements',
      preview: 'Here are the technical requirements for your upcoming performance...',
      time: '10:30 AM',
      unread: true,
      starred: false
    },
    {
      id: '2',
      sender: 'Jazz Corner',
      subject: 'Booking Confirmation',
      preview: 'Your booking for next Friday has been confirmed...',
      time: 'Yesterday',
      unread: false,
      starred: true
    }
  ])

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Message List */}
      <div className="w-80 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 bg-muted"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-2">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedMessage(message.id)}
              >
                <Card className={cn(
                  "p-3 mb-2 cursor-pointer transition-colors",
                  selectedMessage === message.id && "bg-accent",
                  message.unread && "border-primary/50"
                )}>
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{message.sender}</p>
                        <span className="text-xs text-muted-foreground">{message.time}</span>
                      </div>
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Message Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>BN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-lg font-semibold">Blue Note NYC</h2>
                      <p className="text-sm text-muted-foreground">10:30 AM</p>
                    </div>
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p>Here are the technical requirements for your upcoming performance...</p>
                  {/* Add more message content */}
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Textarea 
                  placeholder="Type your reply..." 
                  className="min-h-[100px]"
                />
                <Button className="h-10 w-10 p-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a message to read
          </div>
        )}
      </div>
    </div>
  )
} 