'use client'

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface VenueEquipmentItem {
  id: string
  name: string
  category: string
  description?: string
  availability: 'available' | 'unavailable' | 'request-only'
  specifications?: Record<string, string>
}

interface Venue {
  id: string
  name: string
  location: string
  equipment: VenueEquipmentItem[]
}

export function VenueEquipment() {
  const [searchTerm, setSearchTerm] = useState("")

  const venues: Venue[] = [
    {
      id: "1",
      name: "The Blue Note",
      location: "New York, NY",
      equipment: [
        {
          id: "1",
          name: "Yamaha C7 Grand Piano",
          category: "Instruments",
          description: "Recently tuned concert grand piano",
          availability: 'available',
          specifications: {
            "Size": "7'6\"",
            "Year": "2020",
            "Condition": "Excellent"
          }
        },
        {
          id: "2",
          name: "House PA System",
          category: "Sound",
          description: "Professional sound system with engineer included",
          availability: 'available',
          specifications: {
            "Brand": "d&b audiotechnik",
            "Coverage": "Full room",
            "Engineer": "Included"
          }
        },
      ],
    },
    // Add more venues...
  ]

  const getAvailabilityColor = (availability: VenueEquipmentItem['availability']) => {
    switch (availability) {
      case 'available':
        return 'success'
      case 'unavailable':
        return 'destructive'
      case 'request-only':
        return 'warning'
    }
  }

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.equipment.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search venues or equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {filteredVenues.map((venue) => (
          <AccordionItem key={venue.id} value={venue.id} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start">
                <h3 className="font-semibold">{venue.name}</h3>
                <p className="text-sm text-muted-foreground">{venue.location}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 py-2">
                {venue.equipment.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 border rounded-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.name}</p>
                        <Badge variant={getAvailabilityColor(item.availability)}>
                          {item.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      {item.specifications && (
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {Object.entries(item.specifications).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
} 