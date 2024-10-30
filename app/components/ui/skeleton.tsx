import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export function BookingCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}

export function PaymentCardSkeleton() {
  return (
    <div className="p-6 border rounded-lg space-y-3">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
} 