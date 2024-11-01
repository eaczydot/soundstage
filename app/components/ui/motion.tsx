"use client"

import { motion } from "framer-motion"

export const MotionDiv = motion.div
export const MotionNav = motion.nav
export const MotionSpan = motion.span

export const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 }
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
}

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
} 