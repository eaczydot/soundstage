'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Copy, Edit, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SetupTemplate {
  id: string
  name: string
  type: string
  items: {
    equipment: string
    position: string
    notes?: string
  }[]
  lastUsed?: string
  venue?: string
}

export function SetupTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const templates: SetupTemplate[] = [
    {
      id: "1",
      name: "Jazz Quartet Setup",
      type: "jazz",
      items: [
        { equipment: "Piano", position: "Center Stage", notes: "Grand piano preferred" },
        { equipment: "Drum Kit", position: "Back Center" },
        { equipment: "Bass Amp", position: "Stage Right" },
        { equipment: "Microphones", position: "Various" },
      ],
      lastUsed: "2024-03-15",
      venue: "The Blue Note",
    },
    {
      id: "2",
      name: "Trio Configuration",
      type: "small_ensemble",
      items: [
        { equipment: "Piano", position: "Stage Left" },
        { equipment: "Bass Amp", position: "Center" },
        { equipment: "Drum Kit", position: "Stage Right" },
      ],
      lastUsed: "2024-03-10",
      venue: "Jazz Corner",
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || template.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="jazz">Jazz</SelectItem>
              <SelectItem value="small_ensemble">Small Ensemble</SelectItem>
              <SelectItem value="big_band">Big Band</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'} 
                  {template.venue && ` at ${template.venue}`}
                </p>
              </div>
              <Badge>{template.type}</Badge>
            </div>

            <div className="space-y-4">
              {template.items.map((item, index) => (
                <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.equipment}</p>
                    <p className="text-sm text-muted-foreground">{item.position}</p>
                    {item.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 