import * as React from 'react'
import { cn } from '../cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success'
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-indigo-600 text-white border-transparent',
  secondary: 'bg-gray-700 text-gray-200 border-transparent',
  destructive: 'bg-red-600 text-white border-transparent',
  outline: 'border border-gray-600 text-gray-300 bg-transparent',
  success: 'bg-emerald-600 text-white border-transparent',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
