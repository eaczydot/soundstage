'use client'

import { Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
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
        <DropdownMenuItem onClick={() => router.push('/bookings/new')}>
          New Booking
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/documents/new')}>
          Create Contract
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/payments/new')}>
          Request Payment
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/documents/upload')}>
          Upload Document
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 