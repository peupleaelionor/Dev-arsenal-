import * as React from 'react'
import { cn } from '../cn'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

function getInitials(fallback?: string): string {
  if (!fallback) return '?'
  return fallback
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ className, src, alt, fallback, size = 'md', ...props }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        'bg-gradient-to-br from-indigo-500 to-violet-600',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? fallback ?? 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-semibold text-white">
          {getInitials(fallback)}
        </span>
      )}
    </div>
  )
}
