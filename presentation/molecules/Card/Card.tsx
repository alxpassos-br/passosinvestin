// presentation/molecules/Card/Card.tsx
'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'rounded-2xl border transition-all duration-300 ease-premium',
  {
    variants: {
      variant: {
        default: 'bg-white border-neutral-200 shadow-sm hover:shadow-lg',
        elevated: 'bg-white border-transparent shadow-xl hover:shadow-2xl',
        outlined: 'bg-transparent border-neutral-300 hover:border-primary-500',
        glass: 'bg-white/80 backdrop-blur-xl border-white/20 shadow-lg',
        premium: 'bg-gradient-to-br from-white to-neutral-50 border-gold-300/50 shadow-gold',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1',
        scale: 'hover:scale-[1.02]',
        glow: 'hover:shadow-glow',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'lift',
    },
  }
)

interface CardProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof cardVariants> {
  children: ReactNode
  asChild?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover, className }))}
        whileHover={hover !== 'none' ? { y: -4 } : undefined}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Sub-componentes para composição
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-display text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-500', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export { cardVariants }
export type { CardProps }
