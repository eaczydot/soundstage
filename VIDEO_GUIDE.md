# Video Guide: Setting Up Soundstage in Replit

## Introduction (0:00-0:30)
"In this guide, I'll show you how to quickly set up Soundstage, a musician and venue management platform, in Replit."

## Method 1: Direct GitHub Import (0:30-2:00)
1. Go to replit.com and log in
2. Click "Create Repl"
3. Choose "Import from GitHub"
4. Paste repository URL
5. Click "Import"
6. Wait for initial setup
7. Click "Run"
8. Show the running application

## Method 2: Manual Setup (2:00-4:00)
1. Go to replit.com
2. Click "Create Repl"
3. Choose "Next.js" template
4. Name it "soundstage"
5. Open Shell
6. Run these commands:

```bash
# Clean existing files
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Install dependencies
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs \
  @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns framer-motion \
  lucide-react zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
  @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react \
  @fullcalendar/timegrid recharts

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer @types/node typescript
```

## Environment Setup (4:00-5:00)
1. Create environment variables:
```bash
echo "NEXT_PUBLIC_API_URL=https://$REPL_SLUG.$REPL_OWNER.repl.co" > .env.local
```

2. Configure TypeScript:
```bash
npx tsc --init
```

3. Initialize Tailwind:
```bash
npx tailwindcss init -p
```

## Troubleshooting Common Issues (5:00-7:00)

### Module Not Found Errors
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Styling Issues
```bash
# Rebuild CSS
npm run build:css

# Restart dev server
npm run dev
```

### Memory Issues
```bash
# Increase Node memory limit
NODE_OPTIONS='--max_old_space_size=4096' npm run dev
```

### Type Errors
```bash
# Update TypeScript definitions
npx tsc --noEmit
```

## Development Tips (7:00-8:00)
1. Show hot reload in action
2. Demonstrate using the console
3. Show how to use the Shell
4. Explain file structure

## Features Overview (8:00-9:00)
1. Show the dashboard
2. Demonstrate navigation
3. Show messaging system
4. Display booking calendar

## Conclusion (9:00-9:30)
"You now have Soundstage running in Replit. Happy coding!"
```

Would you like me to:
1. Add more specific error solutions
2. Include debugging tips
3. Add performance optimization steps
4. Create a separate troubleshooting guide

Let me know what would be most helpful!