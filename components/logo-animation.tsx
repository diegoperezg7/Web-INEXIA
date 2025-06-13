"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function LogoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
      >
        <div className="relative">
          {/* Logo glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"></div>

          {/* Logo image */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logo.png"
              alt="NeuraX Logo"
              width={120}
              height={120}
              className="relative z-10 object-contain"
            />
          </motion.div>

          {/* Animated particles around logo */}
          <div className="absolute inset-0 z-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-400"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0.7,
                }}
                animate={{
                  x: Math.cos(i * (Math.PI / 3)) * 80,
                  y: Math.sin(i * (Math.PI / 3)) * 80,
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Animated rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-blue-500/40"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{
                scale: 1 + i * 0.2,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
