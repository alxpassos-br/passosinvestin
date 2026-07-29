// shared/components/animations/FadeIn.tsx
'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  threshold?: number
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  className = '',
  direction = 'up',
  threshold = 0.1,
}: FadeInProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const controls = useAnimation()

  const directionVariants = {
    up: { y: 40, opacity: 0 },
    down: { y: -40, opacity: 0 },
    left: { x: 40, opacity: 0 },
    right: { x: -40, opacity: 0 },
    none: { opacity: 0 },
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [controls, isInView, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: directionVariants[direction],
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1], // Curva premium
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export { FadeIn }
