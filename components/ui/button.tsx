import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
  size?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-white text-black hover:bg-gray-200 px-4 py-2", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }
