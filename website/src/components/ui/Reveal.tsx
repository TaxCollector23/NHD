import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

/*
  Scroll-triggered entrance for a block of prose. Fires once, the moment the
  block enters the viewport, so reading down a chapter feels like it is being
  paced rather than dumped on screen all at once. Framer Motion already
  respects prefers-reduced-motion at the animation-controls level, and
  `viewport={{ once: true }}` means nothing re-triggers on scroll-back.
*/
export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section'
  className?: string
}) {
  const MotionTag = Tag === 'section' ? motion.section : motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
