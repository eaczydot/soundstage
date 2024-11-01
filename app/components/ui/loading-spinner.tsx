"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1,
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={cn(
          "rounded-full border-2 border-primary border-t-transparent",
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  )
} 