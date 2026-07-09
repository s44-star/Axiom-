import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-blue-500 text-white", className)} {...props} />
  )
}
export { Badge }
