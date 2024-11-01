"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { routeVariants, transitionConfig } from "@/lib/motion-variants"

interface RouteTransitionProps {
  children: React.ReactNode
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname()

  const getVariants = (path: string) => {
    // Customize animations based on route
    if (path.startsWith("/dashboard")) {
      return {
        ...routeVariants,
        enter: {
          ...routeVariants.enter,
          transition: {
            ...transitionConfig,
            delay: 0.2,
          },
        },
      }
    }
    
    if (path.startsWith("/messages")) {
      return {
        ...routeVariants,
        initial: { opacity: 0, x: 20 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
      }
    }
    
    return routeVariants
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={getVariants(pathname)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
} 