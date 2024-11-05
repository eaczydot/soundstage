"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PresenceProps {
  children: React.ReactNode
  present?: boolean
}

export function Presence({ children, present = true }: PresenceProps) {
  return (
    <AnimatePresence mode="wait">
      {present && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 