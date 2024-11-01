"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMessageStore, type Attachment } from "@/store/message-store"
import { Upload, X, Paperclip, Send } from "lucide-react"
import { generateId } from "@/lib/utils"

interface MessageComposerProps {
  recipientId: string
  onClose?: () => void
}

export function MessageComposer({ recipientId, onClose }: MessageComposerProps) {
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addMessage = useMessageStore((state) => state.addMessage)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newAttachments: Attachment[] = Array.from(files).map((file) => ({
      id: generateId(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }))

    setAttachments([...attachments, ...newAttachments])
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((a) => a.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!subject.trim() || !content.trim()) return

    addMessage({
      id: generateId(),
      senderId: "current-user", // Replace with actual user ID
      recipientId,
      subject,
      content,
      attachments,
      timestamp: new Date().toISOString(),
      read: false,
      starred: false
    })

    setSubject("")
    setContent("")
    setAttachments([])
    onClose?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      
      <Textarea
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px]"
      />

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 rounded-lg border bg-muted px-3 py-1"
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0"
                onClick={() => removeAttachment(file.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        <Button type="submit">
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </div>
    </form>
  )
} 