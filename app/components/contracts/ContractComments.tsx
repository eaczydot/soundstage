'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { formatRelative } from "@/lib/date"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
}

export function ContractComments() {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      },
      content: "Can we adjust the payment terms to include a deposit?",
      timestamp: "2024-03-15T10:00:00"
    },
    {
      id: "2",
      user: {
        name: "The Blue Note",
        avatar: "/venues/blue-note.jpg"
      },
      content: "Yes, we can add a 25% deposit requirement.",
      timestamp: "2024-03-15T10:30:00"
    }
  ])

  const handleSubmit = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      },
      content: newComment,
      timestamp: new Date().toISOString()
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelative(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
} 