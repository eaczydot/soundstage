interface DashboardHeaderProps {
  heading: string
  description?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  description,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
} 