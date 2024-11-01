"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-dialog"
import { Search, Keyboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface CommandMenuProps extends DialogProps {
  routes: any[]
}

export function CommandMenu({ routes, ...props }: CommandMenuProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {routes.map((route) => (
              <React.Fragment key={route.href}>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    router.push(route.href)
                  }}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  <span>{route.label}</span>
                </CommandItem>
                {route.subItems?.map((subItem: any) => (
                  <CommandItem
                    key={subItem.href}
                    onSelect={() => {
                      setOpen(false)
                      router.push(subItem.href)
                    }}
                    className="ml-4"
                  >
                    <span>{subItem.label}</span>
                    {subItem.shortcut && (
                      <CommandShortcut>{subItem.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </React.Fragment>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 