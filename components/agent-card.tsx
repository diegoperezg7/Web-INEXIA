"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Stat {
  label: string
  value: string
}

interface AgentCardProps {
  icon: ReactNode
  name: string
  description: string
  stats: Stat[]
  gradient: string
}

export function AgentCard({ icon, name, description, stats, gradient }: AgentCardProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div className="relative group">
      {/* Animated border effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isSelected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-70 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isSelected ? { opacity: 0.7, scale: 1.05 } : { opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 0.7, scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      {/* Animated particles */}
      {isSelected && (
        <motion.div className="absolute -inset-10 z-0 opacity-70 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500"
              initial={{
                x: 0,
                y: 0,
                opacity: 0.7,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeOut",
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 h-full flex flex-col relative z-10 overflow-hidden"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 8px 10px -6px rgba(147, 51, 234, 0.2)",
          transition: { duration: 0.2 },
        }}
        animate={
          isSelected
            ? {
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(147, 51, 234, 0.3)",
              }
            : { y: 0 }
        }
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsSelected(!isSelected)}
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px] rounded-xl"></div>

        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-500/30 rounded-tl"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-500/30 rounded-tr"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-500/30 rounded-bl"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-500/30 rounded-br"></div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 h-6 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 h-6 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute left-0 top-1/2 w-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute right-0 top-1/2 w-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 duration-300 relative`}
        >
          <motion.div
            className="text-white"
            animate={
              isSelected
                ? {
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1],
                    transition: { duration: 0.5 },
                  }
                : {}
            }
            whileHover={{ scale: 1.1 }}
          >
            {icon}
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400/30"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-purple-400/30"></div>
        </div>

        <motion.h3
          className="text-xl font-semibold mb-2 text-white"
          animate={isSelected ? { color: "#93c5fd" } : { color: "#ffffff" }}
        >
          {name}
          <div
            className={`h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 transition-all duration-300 ${isSelected ? "w-full" : ""}`}
          ></div>
        </motion.h3>

        <p className="text-blue-100/70 mb-6">{description}</p>

        <motion.div
          className="bg-blue-900/30 rounded-lg p-4 mb-6 transition-all duration-300 relative overflow-hidden"
          animate={
            isSelected
              ? {
                  backgroundColor: "rgba(30, 64, 175, 0.4)",
                  borderLeft: "2px solid #3b82f6",
                }
              : {}
          }
          whileHover={{ backgroundColor: "rgba(30, 64, 175, 0.4)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/5 rounded-full blur-md"></div>
          <div className="absolute -left-4 -top-4 w-16 h-16 bg-purple-500/5 rounded-full blur-md"></div>

          {stats.map((stat, index) => (
            <div key={index} className={`flex justify-between items-center ${index > 0 ? "mt-3" : ""}`}>
              <span className="text-blue-200/70">{stat.label}</span>
              <motion.span
                className="font-bold text-blue-300"
                animate={
                  isSelected
                    ? {
                        color: "#93c5fd",
                        textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                      }
                    : {}
                }
              >
                {stat.value}
              </motion.span>
            </div>
          ))}
        </motion.div>

        <Button
          variant="ghost"
          className="self-start text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-0 mt-auto group relative overflow-hidden"
        >
          <span className="mr-2 relative z-10">Explorar agente</span>
          <motion.div
            animate={isSelected ? { x: [0, 5, 0] } : {}}
            transition={{ repeat: isSelected ? Number.POSITIVE_INFINITY : 0, repeatDelay: 1.5 }}
          >
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </motion.div>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
        </Button>
      </motion.div>
    </div>
  )
}
