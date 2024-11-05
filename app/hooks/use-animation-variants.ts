export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

export const slideVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
} 