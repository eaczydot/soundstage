interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-8 overflow-hidden p-8" {...props}>
      {children}
    </div>
  )
} 