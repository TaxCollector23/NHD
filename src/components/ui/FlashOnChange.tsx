import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/*
  Wraps a value that updates live from a control (a slider, a click). On every
  change it flashes the accent color around the box's edge and fades it out,
  so the update is obvious even when the number itself is easy to miss.
*/
export default function FlashOnChange({
  value,
  children,
  className = '',
}: {
  value: string | number
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      key={value}
      initial={{
        boxShadow: '0 0 0 2px rgba(224,148,28,0.95)',
        backgroundColor: 'rgba(224,148,28,0.16)',
      }}
      animate={{
        boxShadow: '0 0 0 2px rgba(224,148,28,0)',
        backgroundColor: 'rgba(224,148,28,0)',
      }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className={`rounded ${className}`}
    >
      {children}
    </motion.div>
  )
}
