"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function VenueFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search venues..." className="pl-8" />
      </div>
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Genres</SelectItem>
          <SelectItem value="jazz">Jazz</SelectItem>
          <SelectItem value="rock">Rock</SelectItem>
          <SelectItem value="classical">Classical</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="any">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Capacity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Capacity</SelectItem>
          <SelectItem value="small">{"< 200"}</SelectItem>
          <SelectItem value="medium">200 - 500</SelectItem>
          <SelectItem value="large">{"> 500"}</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon">
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
} 