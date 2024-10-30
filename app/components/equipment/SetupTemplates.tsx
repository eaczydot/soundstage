'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Copy, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StageSetupEditor } from "./StageSetupEditor"

interface SetupTemplate {
  id: string
  name: string
  description: string
  equipment: string[]
  stageLayout: any // This would be a more complex type for stage positions
  lastUsed?: string
}

export function SetupTemplates() {
  const [templates, setTemplates] = useState<SetupTemplate[]>([
    {
      id: "1",
      name: "Jazz Quartet",
      description: "Standard jazz quartet setup with piano, bass, drums, and sax",
      equipment: [
        "Acoustic Piano",
        "Double Bass",
        "Drum Kit",
        "Saxophone Microphone",
      ],
      stageLayout: {
        // Stage layout data
      },
      lastUsed: "2024-02-15",
    },
    {
      id: "2",
      name: "Trio + Vocals",
      description: "Jazz trio with vocalist setup",
      equipment: [
        "Electric Piano",
        "Bass Amp",
        "Drum Kit",
        "Vocal Microphone",
      ],
      stageLayout: {
        // Stage layout data
      },
      lastUsed: "2024-02-10",
    },
  ])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:border-primary">
            <Plus className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Create New Template</p>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create Setup Template</DialogTitle>
          </DialogHeader>
          <StageSetupEditor />
        </DialogContent>
      </Dialog>

      {templates.map((template) => (
        <Card key={template.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Equipment List:</p>
              <ul className="text-sm space-y-1">
                {template.equipment.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {template.lastUsed && (
              <p className="text-xs text-muted-foreground">
                Last used: {new Date(template.lastUsed).toLocaleDateString()}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
} 