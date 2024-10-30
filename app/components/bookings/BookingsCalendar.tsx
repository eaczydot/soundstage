'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { BookingDialog } from './BookingDialog'

export function BookingsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const bookings = [
    {
      id: '1',
      title: 'The Blue Note',
      start: '2024-03-20T20:00:00',
      end: '2024-03-20T23:00:00',
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
    },
    {
      id: '2',
      title: 'Jazz Corner',
      start: '2024-03-25T21:30:00',
      end: '2024-03-25T23:30:00',
      backgroundColor: '#22c55e',
      borderColor: '#22c55e',
    },
  ]

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start)
    setDialogOpen(true)
  }

  return (
    <Card className="p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={bookings}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateSelect}
        height="auto"
      />
      <BookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        date={selectedDate}
      />
    </Card>
  )
} 