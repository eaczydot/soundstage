'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  user: {
    name: string
    avatar?: string
    role: 'musician' | 'venue'
  }
  content: string
  timestamp: string
}

interface ContractCommentsProps {
  contractId: string
}

export function ContractComments({ contractId }: ContractCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        role: "musician",
      },
      content: "Can we adjust the performance duration?",
      timestamp: "2024-02-20T10:00:00",
    },
    {
      id: "2",
      user: {
        name: "The Blue Note",
        role: "venue",
      },
      content: "Yes, we can extend it to 3 hours.",
      timestamp: "2024-02-20T10:30:00",
    },
  ])

  const handleSubmit = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "John Doe",
        role: "musician",
      },
      content: newComment,
      timestamp: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  )
} 