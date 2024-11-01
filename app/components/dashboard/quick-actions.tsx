"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Calendar, FileText, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => router.push("/bookings/new")}>
          <Calendar className="mr-2 h-4 w-4" />
          New Booking
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/contracts/new")}>
          <FileText className="mr-2 h-4 w-4" />
          Create Contract
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/payments/new")}>
          <DollarSign className="mr-2 h-4 w-4" />
          Record Payment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 