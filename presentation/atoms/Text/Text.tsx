// presentation/atoms/Text/Text.tsx
'use client'

import { forwardRef, ElementType, ComponentPropsWithoutRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const textVariants = cva('text-neutral-900 dark:text-neutral-100', {
  variants: {
    variant: {
      h1: 'font-display text-5xl font-bold tracking-tight',
      h2: 'font-display text-4xl font-bold tracking-tight',
      h3: 'font-display text-3xl font-semibold tracking-tight',
      h4: 'font-display text-2xl font-semibold tracking-tight',
      h5: 'font-display text-xl font-semibold',
      h6: 'font-display text-lg font-semibold',
      body: 'font-sans text-base leading-relaxed',
      large: 'font-sans text-lg leading-relaxed',
      small: 'font-sans text-sm leading-relaxed',
      caption: 'font-sans text-sm text-neutral-500',
      muted: 'font-sans text-sm text-neutral-500',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      primary: 'text-primary-600',
      gold: 'text-gold-500',
      neutral: 'text-neutral-900',
      muted: 'text-neutral-500',
      error: 'text-error',
      success: 'text-success',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    color: 'neutral',
  },
})

type TextElement = ElementType
type TextProps<C extends TextElement> = ComponentPropsWithoutRef<C> &
  VariantProps<typeof textVariants> & {
    as?: C
    children: React.ReactNode
  }

const Text = forwardRef<HTMLElement, TextProps<TextElement>>(
  ({ className, variant, weight, align, color, as, children, ...props }, ref) => {
    const Component = as || (variant?.startsWith('h') ? (variant as ElementType) : 'p')
    
    return (
      <Component
        ref={ref as any}
        className={cn(textVariants({ variant, weight, align, color }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'

export { Text, textVariants }
export type { TextProps }
