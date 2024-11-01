"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useMessageStore, type Message, type Attachment } from "@/store/message-store"
import { Reply, Star, Download, Paperclip, Trash2 } from "lucide-react"
import { cn, formatDate, formatFileSize, getInitials } from "@/lib/utils"

interface MessageDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  message: Message
  onReply?: () => void
}

export function MessageDetail({ message, onReply, className, ...props }: MessageDetailProps) {
  const markAsRead = useMessageStore((state) => state.markAsRead)
  const toggleStar = useMessageStore((state) => state.toggleStar)
  const deleteMessage = useMessageStore((state) => state.deleteMessage)

  useEffect(() => {
    if (!message.read) {
      markAsRead(message.id)
    }
  }, [message.id, message.read, markAsRead])

  const handleDownload = (attachment: Attachment) => {
    // In a real app, this would handle file downloads
    console.log('Downloading:', attachment.name)
  }

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/avatars/${message.senderId}.png`} />
            <AvatarFallback>{getInitials(message.senderId)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{message.subject}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{message.senderId}</span>
              <span>•</span>
              <span>{formatDate(message.timestamp)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => toggleStar(message.id)}>
            <Star className={cn(
              "h-4 w-4",
              message.starred ? "fill-primary text-primary" : "text-muted-foreground"
            )} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteMessage(message.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button onClick={onReply}>
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            <div className="prose prose-sm dark:prose-invert">
              {message.content.split('\n').map((paragraph, i) => (
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
                          onClick={() => handleDownload(attachment)}
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