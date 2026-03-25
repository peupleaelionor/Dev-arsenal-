import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
}

// Shared button primitive — app implementations import from @devarsenal/ui
// and extend this interface. Full implementation lives in apps/web/src/components/ui/button.tsx.
export type { ButtonProps as UIButtonProps }
