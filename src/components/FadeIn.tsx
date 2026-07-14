import { motion, type Variant } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  as?: ElementType
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
}: FadeInProps) {
  const Component = motion.create(as as any)

  const hidden: Variant = { opacity: 0, x, y }
  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay,
      duration,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }

  return (
    <Component
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      className={className}
    >
      {children}
    </Component>
  )
}
