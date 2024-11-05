import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Building2,
  Music2,
  FileText,
  DollarSign,
  Settings,
} from "lucide-react"

export const routes = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Bookings',
    icon: Calendar,
    href: '/bookings',
  },
  {
    label: 'Messages',
    icon: MessageSquare,
    href: '/messages',
  },
  {
    label: 'Venues',
    icon: Building2,
    href: '/venues',
  },
  {
    label: 'Shows',
    icon: Music2,
    href: '/performances',
  },
  {
    label: 'Contracts',
    icon: FileText,
    href: '/contracts',
  },
  {
    label: 'Payments',
    icon: DollarSign,
    href: '/payments',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
] 