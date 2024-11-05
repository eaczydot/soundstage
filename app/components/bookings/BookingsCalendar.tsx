'use client'

import { Card } from "@/components/ui/card"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useToast } from "@/hooks/use-toast"

const mockEvents = [
  {
    id: '1',
    title: 'Jazz Night at Blue Note',
    start: '2024-03-20T20:00:00',
    end: '2024-03-20T23:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
    extendedProps: {
      venue: 'Blue Note',
      genre: 'Jazz',
      fee: 1500
    }
  },
  {
    id: '2',
    title: 'Rock Show at Electric Ballroom',
    start: '2024-03-22T21:00:00',
    end: '2024-03-23T00:00:00',
    backgroundColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
    extendedProps: {
      venue: 'Electric Ballroom',
      genre: 'Rock',
      fee: 2000
    }
  },
]

export function BookingsCalendar() {
  const { toast } = useToast()

  const handleEventClick = (info: any) => {
    const event = info.event
    toast({
      title: event.title,
      description: `Venue: ${event.extendedProps.venue}\nGenre: ${event.extendedProps.genre}\nFee: $${event.extendedProps.fee}`,
    })
  }

  return (
    <Card className="p-6">
      <div className="fc-theme-custom">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={mockEvents}
          eventClick={handleEventClick}
          height="auto"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          themeSystem='standard'
        />
      </div>

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