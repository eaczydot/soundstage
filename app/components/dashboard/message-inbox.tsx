"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/utils"

interface MessageInboxProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockMessages = [
  {
    id: 1,
    sender: {
      name: "Blue Note NYC",
      avatar: "/venues/bluenote.jpg",
      initials: "BN"
    },
    subject: "Tech requirements for next week",
    preview: "Could you please confirm the stage plot and...",
    timestamp: "2024-03-17T14:30:00",
    unread: true,
    urgent: true
  },
  {
    id: 2,
    sender: {
      name: "Jazz Corner",
      avatar: "/venues/jazzcorner.jpg",
      initials: "JC"
    },
    subject: "Contract for residency",
    preview: "Please review and sign the attached contract...",
    timestamp: "2024-03-17T10:15:00",
    unread: true,
    urgent: false
  },
  {
    id: 3,
    sender: {
      name: "Village Vanguard",
      avatar: "/venues/vanguard.jpg",
      initials: "VV"
    },
    subject: "Soundcheck time update",
    preview: "We need to move the soundcheck earlier to...",
    timestamp: "2024-03-16T18:45:00",
    unread: false,
    urgent: false
  }
]

export function MessageInbox({ className, ...props }: MessageInboxProps) {
  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Messages
          <Badge variant="secondary" className="ml-2">
            {mockMessages.filter(m => m.unread).length} unread
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-4 rounded-lg border p-4",
                  message.unread && "bg-accent/50",
                  "cursor-pointer hover:bg-accent transition-colors"
                )}
              >
                <Avatar>
                  <AvatarImage src={message.sender.avatar} />
                  <AvatarFallback>{message.sender.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {message.sender.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(message.timestamp)}
                    </p>
                  </div>
                  <p className={cn(
                    "text-sm",
                    message.unread ? "font-medium" : "text-muted-foreground"
                  )}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {message.preview}
                  </p>
                </div>
                {message.urgent && (
                  <Badge variant="destructive" className="ml-2">
                    Urgent
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 