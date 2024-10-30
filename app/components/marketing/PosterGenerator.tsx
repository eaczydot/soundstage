'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Download, RefreshCw } from "lucide-react"

export function PosterGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState("1")
  const [fontSize, setFontSize] = useState([24])
  const [posterData, setPosterData] = useState({
    title: "Jazz Night at The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    venue: "The Blue Note",
    description: "An evening of classic jazz standards",
    ticketInfo: "Tickets available at the door",
  })

  const templates = [
    { id: "1", name: "Classic Jazz" },
    { id: "2", name: "Modern Minimal" },
    { id: "3", name: "Vintage Blues" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Template Style</Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input
              value={posterData.title}
              onChange={(e) =>
                setPosterData({ ...posterData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={posterData.date}
                onChange={(e) =>
                  setPosterData({ ...posterData, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={posterData.time}
                onChange={(e) =>
                  setPosterData({ ...posterData, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={posterData.description}
              onChange={(e) =>
                setPosterData({ ...posterData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Title Font Size</Label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={16}
              max={48}
              step={1}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4 p-6">
            <h2 style={{ fontSize: `${fontSize}px` }} className="font-bold">
              {posterData.title}
            </h2>
            <p className="text-lg">
              {new Date(posterData.date).toLocaleDateString()} at{" "}
              {posterData.time}
            </p>
            <p>{posterData.description}</p>
            <p className="text-sm text-muted-foreground">
              {posterData.ticketInfo}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
} 