'use client'

import { cn } from "@/lib/utils"
import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface DashboardGridProps {
  children: React.ReactNode[]
  className?: string
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  const [widgets, setWidgets] = useState([
    { id: 'bookings', label: 'Upcoming Bookings', visible: true },
    { id: 'notifications', label: 'Notifications', visible: true },
    { id: 'payments', label: 'Payment Overview', visible: true },
  ])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    
    const items = Array.from(widgets)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    setWidgets(items)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="h-4 w-4 mr-2" />
              Customize Dashboard
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customize Your Dashboard</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {widgets.map((widget) => (
                <div key={widget.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={widget.id}
                    checked={widget.visible}
                    onCheckedChange={() => {
                      setWidgets(widgets.map(w =>
                        w.id === widget.id ? { ...w, visible: !w.visible } : w
                      ))
                    }}
                  />
                  <Label htmlFor={widget.id}>{widget.label}</Label>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {widgets.map((widget, index) => (
                widget.visible && (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={cn(
                          widget.id === 'bookings' && "md:col-span-2 lg:col-span-2",
                          widget.id === 'payments' && "md:col-span-2 lg:col-span-3"
                        )}
                      >
                        {children[index]}
                      </div>
                    )}
                  </Draggable>
                )
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
} 