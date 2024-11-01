"use client"

import { useRouter } from "next/navigation"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { 
  Star, 
  Pin, 
  EyeOff, 
  Share2, 
  ExternalLink, 
  Copy, 
  MoreHorizontal 
} from "lucide-react"

interface NavContextMenuProps {
  children: React.ReactNode
  route: any
}

export function NavContextMenu({ children, route }: NavContextMenuProps) {
  const router = useRouter()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => router.push(route.href)}>
          <route.icon className="mr-2 h-4 w-4" />
          Open {route.label}
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Star className="mr-2 h-4 w-4" />
          Add to Favorites
          <ContextMenuShortcut>⌘B</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Pin className="mr-2 h-4 w-4" />
          Pin to Top
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">
          <EyeOff className="mr-2 h-4 w-4" />
          Hide from Sidebar
          <ContextMenuShortcut>⌘H</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
} 