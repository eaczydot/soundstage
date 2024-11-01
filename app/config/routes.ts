import {
  Calendar,
  LayoutDashboard,
  Music2,
  FileText,
  Settings,
  DollarSign,
  Megaphone,
  Building2,
} from "lucide-react"

export const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    label: 'Bookings',
    icon: Calendar,
    href: '/bookings',
    subItems: [
      { label: 'Calendar', href: '/bookings/calendar' },
      { label: 'Requests', href: '/bookings/requests' },
      { label: 'History', href: '/bookings/history' },
    ]
  },
  {
    label: 'Venues',
    icon: Building2,
    href: '/venues',
    subItems: [
      { label: 'Browse', href: '/venues/browse' },
      { label: 'Favorites', href: '/venues/favorites' },
      { label: 'Reviews', href: '/venues/reviews' },
    ]
  },
  {
    label: 'Performances',
    icon: Music2,
    href: '/performances',
    subItems: [
      { label: 'Upcoming', href: '/performances/upcoming' },
      { label: 'Past', href: '/performances/past' },
      { label: 'Setlists', href: '/performances/setlists' },
    ]
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
    subItems: [
      { label: 'Earnings', href: '/payments/earnings' },
      { label: 'Invoices', href: '/payments/invoices' },
      { label: 'Tax Documents', href: '/payments/tax' },
    ]
  },
  {
    label: 'Marketing',
    icon: Megaphone,
    href: '/marketing',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
] 