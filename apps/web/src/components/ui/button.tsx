import { type ButtonHTMLAttributes, forwardRef, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  asChild?: boolean
  href?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-brand-500 text-white border border-brand-500',
    'hover:bg-brand-600 hover:border-brand-600',
    'active:bg-brand-700',
    'shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-white/5 text-white border border-white/10',
    'hover:bg-white/10 hover:border-white/20',
    'active:bg-white/[0.07]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  ghost: [
    'bg-transparent text-dark-300 border border-transparent',
    'hover:bg-white/5 hover:text-white',
    'active:bg-white/[0.07]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  outline: [
    'bg-transparent text-brand-400 border border-brand-500/40',
    'hover:bg-brand-500/10 hover:border-brand-500/70 hover:text-brand-300',
    'active:bg-brand-500/[0.07]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
  danger: [
    'bg-red-500/10 text-red-400 border border-red-500/30',
    'hover:bg-red-500/20 hover:border-red-500/50',
    'active:bg-red-500/[0.07]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-xl',
  xl: 'h-14 px-8 text-lg gap-3 rounded-2xl',
}

const buttonClass = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  loading: boolean,
  className?: string
) =>
  cn(
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950',
    'select-none cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    className
  )

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      asChild = false,
      href,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const cls = buttonClass(variant, size, fullWidth, loading, className)

    if (asChild && href) {
      return (
        <Link href={href} className={cls}>
          {loading && <Spinner />}
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cls}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize }
