"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
}

export function ServiceCard({ icon, title, description, gradient }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 h-full flex flex-col relative overflow-hidden group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 animate-gradient-x"></div>
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px] rounded-xl"></div>

      {/* Decorative dots */}
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400/40 rounded-full"></div>
        <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400/40 rounded-full"></div>
        <div className="absolute top-8 right-4 w-1 h-1 bg-blue-400/40 rounded-full"></div>
      </div>

      <div
        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 relative z-10 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300`}
      >
        <motion.div
          className="text-white"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>

        {/* Decorative corner accents */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-blue-300/40 rounded-tl"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-blue-300/40 rounded-tr"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-blue-300/40 rounded-bl"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-blue-300/40 rounded-br"></div>
      </div>

      <h3 className="text-xl font-semibold mb-2 text-white relative z-10 group-hover:text-blue-200 transition-colors duration-300">
        {title}
        <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 group-hover:w-full transition-all duration-300"></div>
      </h3>

      <p className="text-blue-100/70 mb-6 flex-grow relative z-10 group-hover:text-blue-100/90 transition-colors duration-300">
        {description}
      </p>

      <Button
        variant="ghost"
        className="self-start text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0 group relative z-10 overflow-hidden"
      >
        <span className="mr-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300">
          Ver ejemplo
        </span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
      </Button>
    </motion.div>
  )
}
