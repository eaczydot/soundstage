'use client'

import { Card } from "@/components/ui/card"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCallback, useState } from "react"
import { BookingDialog } from "./BookingDialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function BookingsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDateSelect = useCallback((selectInfo: any) => {
    setSelectedDate(selectInfo.start)
    setIsDialogOpen(true)
  }, [])

  const events = [
    {
      id: '1',
      title: 'The Blue Note',
      start: '2024-03-20T20:00:00',
      end: '2024-03-20T23:00:00',
      backgroundColor: '#22c55e',
      extendedProps: {
        status: 'confirmed',
        tags: ['Tech Setup Needed', 'Full Band'],
        requirements: 'Stage plot required',
      }
    },
    {
      id: '2',
      title: 'Jazz Corner',
      start: '2024-03-25T21:30:00',
      end: '2024-03-25T23:30:00',
      backgroundColor: '#cbd5e1',
      extendedProps: {
        status: 'pending',
        tags: ['Invoice Pending'],
        requirements: 'Backline provided',
      }
    },
  ]

  const renderEventContent = (eventInfo: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col p-1">
              <span className="font-medium">{eventInfo.event.title}</span>
              <span className="text-xs">
                {eventInfo.timeText}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2">
              <p className="font-medium">{eventInfo.event.title}</p>
              <p className="text-sm">{eventInfo.timeText}</p>
              <div className="flex flex-wrap gap-1">
                {eventInfo.event.extendedProps.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {eventInfo.event.extendedProps.requirements}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Card className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        selectable={true}
        select={handleDateSelect}
        height="auto"
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        eventDidMount={(info) => {
          info.el.style.cursor = 'pointer'
        }}
      />
      <BookingDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        date={selectedDate}
      />
    </Card>
  )
} 