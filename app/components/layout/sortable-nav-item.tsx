"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavItem } from "./nav-item"
import { MotionDiv } from "../ui/motion"

interface SortableNavItemProps {
  id: string
  route: any
  isCollapsed: boolean
  pathname: string
}

export function SortableNavItem({ id, route, isCollapsed, pathname }: SortableNavItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <MotionDiv
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative",
        isDragging && "z-50"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
          isCollapsed && "hidden"
        )}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <NavItem route={route} isCollapsed={isCollapsed} pathname={pathname} />
    </MotionDiv>
  )
} 