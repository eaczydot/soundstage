"use client"

import { ToastProvider as Provider } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function ToastProvider() {
  const { toasts } = useToast()

  return (
    <Provider>
      {toasts}
    </Provider>
  )
} 