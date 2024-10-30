'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Image as ImageIcon, Palette } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function PosterGenerator() {
  const [posterData, setPosterData] = useState({
    title: "Jazz Night at The Blue Note",
    date: "2024-03-20",
    time: "20:00",
    venue: "The Blue Note",
    description: "An evening of classic jazz standards",
    theme: "modern",
    image: null as File | null,
  })

  const themes = [
    { value: "modern", label: "Modern" },
    { value: "classic", label: "Classic Jazz" },
    { value: "minimal", label: "Minimalist" },
    { value: "vintage", label: "Vintage" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6 space-y-6">
        {/* Form inputs */}
        <div className="space-y-4">
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
            <Label>Venue</Label>
            <Input
              value={posterData.venue}
              onChange={(e) =>
                setPosterData({ ...posterData, venue: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={posterData.description}
              onChange={(e) =>
                setPosterData({ ...posterData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={posterData.theme}
              onValueChange={(value) =>
                setPosterData({ ...posterData, theme: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
              {posterData.image && (
                <span className="text-sm text-muted-foreground">
                  {posterData.image.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Palette className="mr-2 h-4 w-4" />
          Generate Poster
        </Button>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Poster Preview</p>
          </div>

          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Poster
          </Button>
        </div>
      </Card>
    </div>
  )
} 