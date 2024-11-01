"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface NavItemProps {
  route: any
  isCollapsed: boolean
  pathname: string
}

export function NavItem({ route, isCollapsed, pathname }: NavItemProps) {
  const { toast } = useToast()

  const handleAddToFavorites = () => {
    toast({
      title: "Added to favorites",
      description: `${route.label} has been added to your favorites.`,
    })
  }

  const handleHideFromSidebar = () => {
    toast({
      title: "Hidden from sidebar",
      description: `${route.label} has been hidden from the sidebar.`,
      variant: "destructive",
    })
  }

  const handlePinToTop = () => {
    toast({
      title: "Pinned to top",
      description: `${route.label} has been pinned to the top.`,
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="group">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && (
                    <>
                      <span>{route.label}</span>
                      {route.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {route.badge}
                        </Badge>
                      )}
                      {route.subItems && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </>
                  )}
                </Link>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="flex items-center gap-4">
                {route.label}
                {route.badge && (
                  <Badge variant="secondary">{route.badge}</Badge>
                )}
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => window.open(route.href, '_blank')}>
          Open in New Tab
        </ContextMenuItem>
        <ContextMenuItem onClick={handleAddToFavorites}>
          Add to Favorites
        </ContextMenuItem>
        <ContextMenuItem onClick={handlePinToTop}>
          Pin to Top
        </ContextMenuItem>
        <ContextMenuSeparator />
        {route.subItems && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Jump to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              {route.subItems.map((subItem: any) => (
                <ContextMenuItem
                  key={subItem.href}
                  onClick={() => window.location.href = subItem.href}
                >
                  {subItem.label}
                  {subItem.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {subItem.badge}
                    </Badge>
                  )}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={handleHideFromSidebar}
          className="text-destructive focus:text-destructive"
        >
          Hide from Sidebar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
} 