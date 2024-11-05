"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Reply, Star, Download, Paperclip, Trash2 } from "lucide-react"
import { cn, formatDate, formatFileSize } from "@/lib/utils"

interface Attachment {
  id: string
  name: string
  size: number
  type: string
  url: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  subject: string
  content: string
  timestamp: string
  read: boolean
  attachments: Attachment[]
}

interface MessageDetailProps {
  message: Message
  onReply?: () => void
  onDelete?: () => void
}

export function MessageDetail({ message, onReply, onDelete }: MessageDetailProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={message.senderAvatar} />
            <AvatarFallback>{message.senderName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{message.subject}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{message.senderName}</p>
              <span className="text-sm text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                {formatDate(message.timestamp)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onReply}>
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            <div className="prose prose-sm dark:prose-invert">
              {message.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            {message.attachments.length > 0 && (
              <div className="space-y-4">
                <Separator />
                <div>
                  <h4 className="mb-4 text-sm font-medium">Attachments</h4>
                  <div className="grid gap-2">
                    {message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(attachment.url)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 