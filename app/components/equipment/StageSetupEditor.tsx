'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StageItem {
  id: string
  equipment: string
  position: string
  notes?: string
}

export function StageSetupEditor() {
  const [items, setItems] = useState<StageItem[]>([
    {
      id: "1",
      equipment: "Piano",
      position: "Center Stage",
      notes: "Grand piano preferred",
    },
    {
      id: "2",
      equipment: "Drum Kit",
      position: "Back Center",
    },
  ])

  const addItem = () => {
    const newItem: StageItem = {
      id: Date.now().toString(),
      equipment: "",
      position: "",
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof StageItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Stage Setup</h2>
            <p className="text-sm text-muted-foreground">
              Configure your equipment positions and requirements
            </p>
          </div>
          <Button onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 p-4 border rounded-lg relative"
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Equipment</Label>
                  <Select
                    value={item.equipment}
                    onValueChange={(value) =>
                      updateItem(item.id, "equipment", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Piano">Piano</SelectItem>
                      <SelectItem value="Drum Kit">Drum Kit</SelectItem>
                      <SelectItem value="Bass Amp">Bass Amp</SelectItem>
                      <SelectItem value="Guitar Amp">Guitar Amp</SelectItem>
                      <SelectItem value="Microphone">Microphone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={item.position}
                    onValueChange={(value) =>
                      updateItem(item.id, "position", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Center Stage">Center Stage</SelectItem>
                      <SelectItem value="Stage Left">Stage Left</SelectItem>
                      <SelectItem value="Stage Right">Stage Right</SelectItem>
                      <SelectItem value="Back Center">Back Center</SelectItem>
                      <SelectItem value="Front Center">Front Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={item.notes}
                  onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                  placeholder="Add any specific requirements or notes..."
                />
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Setup
        </Button>
      </div>
    </Card>
  )
} 