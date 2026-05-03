'use client'

import { motion, useScroll, useSpring } from 'motion/react'

export function ReadingProgress() {
  let { scrollYProgress } = useScroll()
  let scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[9999] h-[2px] origin-left bg-sand-500/60"
      style={{ scaleX }}
    />
  )
}
