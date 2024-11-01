"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface TaskListProps extends React.HTMLAttributes<HTMLDivElement> {}

const mockTasks = [
  {
    id: 1,
    title: "Submit setlist for Blue Note performance",
    dueDate: "2024-03-18",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    title: "Sign contract for Jazz Corner residency",
    dueDate: "2024-03-20",
    priority: "high",
    status: "pending"
  },
  {
    id: 3,
    title: "Upload tech rider for Village Vanguard",
    dueDate: "2024-03-25",
    priority: "medium",
    status: "in_progress"
  },
  {
    id: 4,
    title: "Review payment details for last week's shows",
    dueDate: "2024-03-15",
    priority: "medium",
    status: "completed"
  }
]

const priorityColors = {
  high: "text-destructive",
  medium: "text-yellow-500",
  low: "text-green-500"
}

const statusIcons = {
  pending: AlertCircle,
  in_progress: Clock,
  completed: CheckCircle2
}

export function TaskList({ className, ...props }: TaskListProps) {
  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Action Items
          <Badge variant="secondary" className="ml-2">
            {mockTasks.filter(t => t.status !== "completed").length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockTasks.map((task) => {
              const StatusIcon = statusIcons[task.status as keyof typeof statusIcons]
              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center justify-between space-x-4 rounded-lg border p-4",
                    task.status === "completed" && "opacity-60"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusIcon className={cn(
                        "h-4 w-4",
                        task.status === "completed" ? "text-green-500" : priorityColors[task.priority as keyof typeof priorityColors]
                      )} />
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Due: {task.dueDate}
                    </div>
                  </div>
                  <Badge variant={task.status === "completed" ? "secondary" : "default"}>
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 