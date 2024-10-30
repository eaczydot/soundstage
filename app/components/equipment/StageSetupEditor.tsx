'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { GripVertical, Plus, X } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StageSetupItem {
  id: string
  name: string
  type: 'instrument' | 'sound' | 'lighting' | 'other'
  position?: { x: number; y: number }
  notes?: string
}

export function StageSetupEditor() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<StageSetupItem[]>([])
  const [newItem, setNewItem] = useState("")

  const handleAddItem = () => {
    if (!newItem.trim()) return

    const item: StageSetupItem = {
      id: Date.now().toString(),
      name: newItem.trim(),
      type: 'instrument',
    }

    setItems([...items, item])
    setNewItem("")
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const reorderedItems = Array.from(items)
    const [movedItem] = reorderedItems.splice(result.source.index, 1)
    reorderedItems.splice(result.destination.index, 0, movedItem)

    setItems(reorderedItems)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Setup Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Jazz Quartet Setup"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the setup and its requirements..."
          />
        </div>

        <div className="space-y-4">
          <Label>Stage Items</Label>
          <div className="flex gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add stage item..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="stage-items">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-2 p-2 border rounded-md bg-background"
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="flex-1">{item.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Setup</Button>
        </div>
      </div>
    </Card>
  )
} 