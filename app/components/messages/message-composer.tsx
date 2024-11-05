"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Paperclip, X, Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Attachment {
  id: string
  name: string
  size: number
  type: string
}

export function MessageComposer() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        id: Math.random().toString(36).slice(2),
        name: file.name,
        size: file.size,
        type: file.type
      }))
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission
    console.log({ subject, content, attachments })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              placeholder="Write your message..."
              className="min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {attachments.length > 0 && (
            <ScrollArea className="h-[100px] rounded-md border p-2">
              <div className="space-y-2">
                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAttachment(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="icon">
                <label htmlFor="file" className="cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                  <input
                    type="file"
                    id="file"
                    multiple
                    className="hidden"
                    onChange={handleAttachment}
                  />
                </label>
              </Button>
            </div>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 