"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Circle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { CompactProps } from "@/types/layout"

interface Message {
  id: string
  sender: string
  content: string
  time: string
  read: boolean
  avatar?: string
}

export function MessageInbox({ isCompact }: CompactProps) {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Blue Note NYC',
      content: 'Tech requirements for next...',
      time: '5m ago',
      read: false
    },
    {
      id: '2',
      sender: 'Jazz Corner',
      content: 'Payment confirmation for...',
      time: '1h ago',
      read: false
    },
    {
      id: '3',
      sender: 'Village Vanguard',
      content: 'Updated contract details...',
      time: '2h ago',
      read: true
    }
  ])

  return (
    <Card className="h-full">
      <CardHeader className={cn(
        "flex flex-row items-center justify-between",
        isCompact ? "py-2" : "py-3"
      )}>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Messages</CardTitle>
          <Badge variant="secondary">
            {messages.filter(m => !m.read).length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-7">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className={cn(
        isCompact ? "p-2" : "p-3"
      )}>
        <ScrollArea className="h-[calc(100%-2rem)]">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="mb-2"
              >
                <div className={cn(
                  "flex items-start space-x-3 rounded-lg border p-3",
                  message.read ? 'bg-background' : 'bg-accent/5',
                  isCompact ? 'p-2' : 'p-3'
                )}>
                  <div className="relative">
                    {!message.read && (
                      <Circle className="absolute -left-1 -top-1 h-2 w-2 fill-primary text-primary" />
                    )}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-semibold">
                        {message.sender[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "font-medium leading-none",
                        isCompact ? "text-xs" : "text-sm"
                      )}>
                        {message.sender}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.time}
                      </p>
                    </div>
                    <p className={cn(
                      "text-muted-foreground line-clamp-1",
                      isCompact ? "text-xs" : "text-sm"
                    )}>
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 