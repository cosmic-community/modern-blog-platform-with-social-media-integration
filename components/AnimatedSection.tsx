'use client'

import { motion } from 'framer-motion'
import type { CinematicTransitionProps } from '@/types'

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  'cinematic-zoom': {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function AnimatedSection({
  children,
  className = '',
  variant = 'fade',
  duration = 0.6,
  delay = 0,
}: CinematicTransitionProps & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants[variant]}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}