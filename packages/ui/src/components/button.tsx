import * as React from 'react'
import { cn } from '../cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-indigo-600 text-white shadow hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-indigo-500',
  destructive:
    'bg-red-600 text-white shadow hover:bg-red-500 active:bg-red-700 focus-visible:ring-red-500',
  outline:
    'border border-gray-700 bg-transparent text-gray-200 shadow-sm hover:bg-gray-800 hover:border-gray-600 focus-visible:ring-indigo-500',
  ghost:
    'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white focus-visible:ring-indigo-500',
  link: 'bg-transparent text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300 focus-visible:ring-indigo-500',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 rounded-md px-3 text-xs',
  default: 'h-9 rounded-md px-4 py-2 text-sm',
  lg: 'h-11 rounded-md px-8 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all',
          'disabled:pointer-events-none disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950',
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
