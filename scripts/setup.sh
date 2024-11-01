#!/bin/bash

# Install additional dependencies
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs \
  @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns framer-motion \
  lucide-react zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
  @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react \
  @fullcalendar/timegrid recharts

# Clone the repository with project structure
git clone https://github.com/yourusername/soundstage-template.git temp
cp -r temp/* .
rm -rf temp

# Build the project
npm run build 