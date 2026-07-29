// shared/components/animations/Stagger.tsx
'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { ReactNode, useRef, useEffect } from 'react'

interface StaggerProps {
  children: ReactNode[]
  staggerDelay?: number
  itemDelay?: number
  duration?: number
  className?: string
  once?: boolean
}

const Stagger = ({
  children,
  staggerDelay = 0.1,
  itemDelay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: StaggerProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: itemDelay,
          },
        },
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: {
              y: 20,
              opacity: 0,
            },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export { Stagger }
