import { useState, useEffect } from "react"

interface SwipeHandlers {
  onSwipedLeft?: () => void
  onSwipedRight?: () => void
}

export function useSwipe({ onSwipedLeft, onSwipedRight }: SwipeHandlers) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance
  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipedLeft) {
      onSwipedLeft()
    }
    if (isRightSwipe && onSwipedRight) {
      onSwipedRight()
    }
  }

  useEffect(() => {
    const element = document
    element.addEventListener('touchstart', onTouchStart)
    element.addEventListener('touchmove', onTouchMove)
    element.addEventListener('touchend', onTouchEnd)

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', onTouchEnd)
    }
  }, [touchStart, touchEnd])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
} 