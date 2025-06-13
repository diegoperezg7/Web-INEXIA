"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string
  description: string
}

export function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 relative overflow-hidden group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute -right-6 -top-6 w-16 h-16 bg-blue-500/10 rounded-full blur-lg group-hover:bg-blue-500/20 transition-all duration-700"></div>
      <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-purple-500/10 rounded-full blur-lg group-hover:bg-purple-500/20 transition-all duration-700"></div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px] rounded-xl"></div>

      {/* Decorative corner accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-500/30 rounded-tl"></div>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-500/30 rounded-tr"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-500/30 rounded-bl"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-500/30 rounded-br"></div>

      <div className="flex items-center mb-4 relative z-10">
        <motion.div
          className="mr-4 relative"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
          <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">
          {title}
        </h3>
      </div>

      <div className="ml-12 relative z-10">
        <div className="relative">
          <p className="text-3xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors duration-300">
            {value}
          </p>
          <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-300"></div>
        </div>
        <p className="text-blue-100/70 mt-2 group-hover:text-blue-100/90 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-3 right-3 flex space-x-1">
        <div className="w-1 h-1 rounded-full bg-blue-400/40"></div>
        <div className="w-1 h-1 rounded-full bg-purple-400/40"></div>
        <div className="w-1 h-1 rounded-full bg-blue-400/40"></div>
      </div>
    </motion.div>
  )
}
