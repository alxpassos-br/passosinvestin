// presentation/atoms/Button/Button.tsx
'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

// Variantes usando Class Variance Authority (padrão moderno)
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primário (azul - tecnologia e confiança)
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50',
        // Secundário (outline - elegância)
        secondary: 'border-2 border-neutral-300 bg-transparent text-neutral-700 hover:border-primary-600 hover:text-primary-600',
        // Gold (premium - destaque especial)
        gold: 'bg-gradient-to-r from-gold-400 to-gold-500 text-neutral-900 font-semibold hover:from-gold-500 hover:to-gold-600 shadow-gold',
        // Ghost (minimalista)
        ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
        // Link (texto simples)
        link: 'text-primary-600 underline-offset-4 hover:underline',
        // Destructive (erro/ação perigosa)
        destructive: 'bg-error text-white hover:bg-error/90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {isLoading ? (
          <motion.div
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        
        {children}
        
        {rightIcon && !isLoading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
