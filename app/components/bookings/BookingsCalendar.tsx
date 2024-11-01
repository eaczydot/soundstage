'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// Mock data for events
const mockEvents = [
  {
    id: '1',
    title: 'The Blue Note',
    start: '2024-03-15T20:00:00',
    end: '2024-03-15T23:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
  },
  {
    id: '2',
    title: 'Jazz Corner',
    start: '2024-03-18T19:00:00',
    end: '2024-03-18T22:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
  },
]

export function BookingsCalendar() {
  const [currentEvents, setCurrentEvents] = useState(mockEvents)

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter venue name for the booking:')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: String(currentEvents.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        backgroundColor: 'hsl(var(--primary))',
        borderColor: 'hsl(var(--primary))',
      })
    }
  }

  const handleEventClick = (clickInfo: any) => {
    if (confirm(`Are you sure you want to delete the booking at '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove()
    }
  }

  return (
    <Card className="p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='dayGridMonth'
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={currentEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto"
        // Theme customization
        themeSystem='standard'
        className="fc-theme-custom"
      />

      <style jsx global>{`
        .fc-theme-custom {
          --fc-border-color: hsl(var(--border));
          --fc-button-bg-color: hsl(var(--primary));
          --fc-button-border-color: hsl(var(--primary));
          --fc-button-hover-bg-color: hsl(var(--primary) / 0.9);
          --fc-button-hover-border-color: hsl(var(--primary) / 0.9);
          --fc-button-active-bg-color: hsl(var(--primary) / 0.8);
          --fc-button-active-border-color: hsl(var(--primary) / 0.8);
          --fc-event-bg-color: hsl(var(--primary));
          --fc-event-border-color: hsl(var(--primary));
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: hsl(var(--card));
          --fc-list-event-hover-bg-color: hsl(var(--accent));
          --fc-today-bg-color: hsl(var(--accent) / 0.1);
        }

        .fc {
          background: hsl(var(--card));
          border-radius: var(--radius);
        }

        .fc th {
          color: hsl(var(--foreground));
        }

        .fc-day {
          color: hsl(var(--foreground));
        }

        .fc-day-other {
          color: hsl(var(--muted-foreground));
        }

        .fc-button {
          font-weight: 500;
          border-radius: var(--radius);
        }

        .fc-event {
          border-radius: calc(var(--radius) - 2px);
          padding: 2px 4px;
          font-size: 0.875rem;
        }
      `}</style>
    </Card>
  )
} 