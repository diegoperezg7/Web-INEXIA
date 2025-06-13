"use client"

import { motion } from "framer-motion"

export function HeroGlow() {
  return (
    <>
      {/* Top right glow */}
      <motion.div
        className="absolute top-20 right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px] z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Bottom left glow */}
      <motion.div
        className="absolute bottom-20 left-[10%] w-[250px] h-[250px] rounded-full bg-purple-500/20 blur-[100px] z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] z-0"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </>
  )
}
