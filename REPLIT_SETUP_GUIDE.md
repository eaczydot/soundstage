# Complete Setup Guide for Soundstage on Replit

## Method 1: Direct GitHub Import (Recommended)

1. Fork the Repository
   - Go to `https://github.com/yourusername/soundstage`
   - Click "Fork" in the top right
   - Wait for the fork to complete

2. Import to Replit
   - Go to [replit.com](https://replit.com)
   - Click "Create Repl"
   - Choose "Import from GitHub"
   - Select your forked repository
   - Click "Import"

3. Initial Setup
```bash
# Clear any existing build files
rm -rf .next
rm -rf node_modules
rm package-lock.json

# Install dependencies
npm install

# Build the project
npm run build
```

4. Start the Development Server
```bash
npm run dev
```

## Method 2: Manual Setup

1. Create New Repl
   - Go to [replit.com](https://replit.com)
   - Click "Create Repl"
   - Choose "Next.js" template
   - Name it "soundstage"

2. Install Dependencies
```bash
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar \
  @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label \
  @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-scroll-area \
  @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs \
  @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns framer-motion \
  lucide-react zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
  @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react \
  @fullcalendar/timegrid recharts
```

3. Install Dev Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer @types/node typescript
```

4. Initialize Tailwind
```bash
npx tailwindcss init -p
```

## Troubleshooting

### If you see module not found errors:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### If the build fails:
```bash
rm -rf .next
npm run build
```

### If styles aren't loading:
```bash
npm run build:css
npm run dev
```

### For memory issues:
```bash
NODE_OPTIONS='--max_old_space_size=4096' npm run dev
```

## Verifying Installation

1. Check the Components:
   - Open `app/page.tsx`
   - Verify the dashboard is rendering
   - Check navigation works

2. Test Features:
   - Try the command menu (Cmd/Ctrl + K)
   - Test navigation links
   - Verify dark mode toggle

## Development Workflow

1. Make changes in the Replit editor
2. Changes auto-save and hot reload
3. Use the Shell for commands
4. Check Console for errors

## Deployment

1. The app automatically deploys to Replit's hosting
2. Click "Run" to start the server
3. Use the provided Replit URL to access your app

## Additional Resources

- View logs in the Console tab
- Use Shell for npm commands
- Check "Secrets" tab for environment variables
- Use "Version Control" tab for Git operations