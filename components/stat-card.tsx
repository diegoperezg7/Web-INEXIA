"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string
  description: string
}

export function StatCard({ icon, title, value, description }: StatCardProps) {
  // Animación de conteo para el valor si es numérico
  const [displayValue, setDisplayValue] = useState(value)
  useEffect(() => {
    if (/^[+-]?\d+%?$/.test(value)) {
      let start = 0
      let end = parseInt(value)
      let isPercent = value.includes("%")
      let prefix = value.startsWith("-") ? "-" : value.startsWith("+") ? "+" : ""
      let absEnd = Math.abs(end)
      let duration = 800
      let startTime: number | null = null
      function animate(ts: number) {
        if (!startTime) startTime = ts
        let progress = Math.min((ts - startTime) / duration, 1)
        let current = Math.round(absEnd * progress)
        setDisplayValue(`${prefix}${current}${isPercent ? "%" : ""}`)
        if (progress < 1) requestAnimationFrame(animate)
      }
      setDisplayValue(`${prefix}0${isPercent ? "%" : ""}`)
      requestAnimationFrame(animate)
    } else {
      setDisplayValue(value)
    }
  }, [value])

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/60 to-purple-900/30 backdrop-blur-xl rounded-2xl border-2 border-blue-500/30 p-4 sm:p-6 md:p-8 relative overflow-visible group shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-500"
      whileHover={{ y: -8, scale: 1.04, boxShadow: "0 0 40px 8px #6366f1aa" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Partículas decorativas */}
      <motion.div
        className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-blue-400/10 rounded-full blur-2xl z-0 animate-pulse"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-4 sm:-bottom-8 right-1/2 translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-purple-400/10 rounded-full blur-2xl z-0 animate-pulse"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      {/* Glow animado al pasar el mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />
      {/* Esquinas decoradas */}
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-blue-400/60 to-purple-400/40 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400/40 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400/40 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-purple-400/60 to-blue-400/40 rounded-full blur-sm animate-pulse" />
      {/* Ícono grande y brillante */}
        <motion.div
        className="flex items-center justify-center mb-4 sm:mb-6 relative z-10"
        whileHover={{ rotate: 8, scale: 1.18 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/20 shadow-lg shadow-blue-500/20 border border-blue-400/20">
          <span className="text-2xl sm:text-4xl md:text-5xl text-blue-300 drop-shadow-lg animate-pulse-slow">{icon}</span>
        </div>
        </motion.div>
      {/* Título */}
      <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-2 group-hover:text-blue-200 transition-colors duration-300 z-10">
          {title}
        </h3>
      {/* Valor animado */}
      <motion.p
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-2 group-hover:text-blue-200 transition-colors duration-300 z-10 drop-shadow-lg"
        animate={{ scale: [1, 1.08, 1], textShadow: [
          "0 0 16px #6366f1cc, 0 0 32px #a78bfa88",
          "0 0 32px #6366f1cc, 0 0 48px #a78bfa88",
          "0 0 16px #6366f1cc, 0 0 32px #a78bfa88"
        ] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {displayValue}
      </motion.p>
      {/* Línea decorativa */}
      <div className="h-1 w-12 sm:w-16 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full group-hover:w-3/4 transition-all duration-300 z-10" />
      {/* Descripción */}
      <p className="text-blue-100/80 mt-3 sm:mt-4 text-center text-sm sm:text-base md:text-lg group-hover:text-blue-100/90 transition-colors duration-300 z-10">
          {description}
        </p>
    </motion.div>
  )
}
