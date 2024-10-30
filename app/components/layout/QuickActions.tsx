'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/bookings/new")}>
          New Booking
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/marketing/new")}>
          Create Campaign
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/events/new")}>
          Create Event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 