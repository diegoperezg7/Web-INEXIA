"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react"
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
  type?: string
}

export function AgentCard({ icon, name, description, stats, gradient, type }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const cardVariants = {
    initial: {
      scale: 1,
      rotateY: 0,
      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.1)",
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 20px 60px rgba(59, 130, 246, 0.3), 0 10px 30px rgba(147, 51, 234, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    selected: {
      scale: 1.05,
      rotateY: 0,
      boxShadow: "0 25px 80px rgba(59, 130, 246, 0.4), 0 15px 40px rgba(147, 51, 234, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  }

  const iconVariants = {
    initial: {
      rotate: 0,
      scale: 1,
      filter: "brightness(1)",
    },
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.1,
      filter: "brightness(1.2)",
      transition: {
        rotate: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.3 },
        filter: { duration: 0.3 },
      },
    },
    selected: {
      rotate: [0, 360],
      scale: 1.2,
      filter: "brightness(1.3)",
      transition: {
        rotate: { duration: 1, ease: "easeInOut" },
        scale: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    },
  }

  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, rgba(30, 64, 175, 0.3) 0%, rgba(30, 64, 175, 0.1) 100%)",
    },
    hover: {
      background: [
        "linear-gradient(135deg, rgba(30, 64, 175, 0.4) 0%, rgba(147, 51, 234, 0.2) 100%)",
        "linear-gradient(135deg, rgba(147, 51, 234, 0.4) 0%, rgba(30, 64, 175, 0.2) 100%)",
        "linear-gradient(135deg, rgba(30, 64, 175, 0.4) 0%, rgba(147, 51, 234, 0.2) 100%)",
      ],
      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
    },
  }

  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 2,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative group perspective-1000">
      {/* Floating particles */}
      <AnimatePresence>
        {(isHovered || isSelected) && (
          <div className="absolute -inset-10 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                variants={particleVariants}
                initial="initial"
                animate="animate"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0"
        animate={
          isHovered || isSelected
            ? {
                opacity: [0, 0.6, 0],
                scale: [0.95, 1.05, 0.95],
                background: [
                  "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #3b82f6)",
                  "conic-gradient(from 120deg, #3b82f6, #8b5cf6, #3b82f6)",
                  "conic-gradient(from 240deg, #3b82f6, #8b5cf6, #3b82f6)",
                ],
              }
            : { opacity: 0 }
        }
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Main card */}
      <motion.div
        className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 h-full flex flex-col overflow-hidden cursor-pointer transform-gpu"
        variants={cardVariants}
        initial="initial"
        animate={isSelected ? "selected" : isHovered ? "hover" : "initial"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsSelected(!isSelected)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-50"
          variants={backgroundVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_50%)] opacity-30" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] rounded-2xl" />

        {/* Corner accents with animation */}
        {[
          { position: "top-4 left-4", border: "border-t-2 border-l-2", corner: "rounded-tl" },
          { position: "top-4 right-4", border: "border-t-2 border-r-2", corner: "rounded-tr" },
          { position: "bottom-4 left-4", border: "border-b-2 border-l-2", corner: "rounded-bl" },
          { position: "bottom-4 right-4", border: "border-b-2 border-r-2", corner: "rounded-br" },
        ].map((accent, i) => (
          <motion.div
            key={i}
            className={`absolute ${accent.position} w-4 h-4 ${accent.border} ${accent.corner}`}
            animate={{
              borderColor: isSelected
                ? ["#3b82f6", "#8b5cf6", "#3b82f6"]
                : isHovered
                  ? "#3b82f6"
                  : "rgba(59, 130, 246, 0.3)",
              scale: isHovered || isSelected ? [1, 1.2, 1] : 1,
            }}
            transition={{
              borderColor: { duration: 2, repeat: isSelected ? Number.POSITIVE_INFINITY : 0 },
              scale: {
                duration: 0.6,
                repeat: isHovered || isSelected ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              },
            }}
          />
        ))}

        {/* Icon container with enhanced animations */}
        <div className="relative mb-6 flex justify-center">
          <motion.div
            className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
            variants={iconVariants}
            initial="initial"
            animate={isSelected ? "selected" : isHovered ? "hover" : "initial"}
          >
            {/* Icon glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"
              animate={{
                opacity: isHovered || isSelected ? [0.2, 0.4, 0.2] : 0.2,
              }}
              transition={{ duration: 2, repeat: isHovered || isSelected ? Number.POSITIVE_INFINITY : 0 }}
            />

            {/* Rotating border */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0"
              animate={{
                opacity: isSelected ? 0.6 : 0,
                rotate: isSelected ? 360 : 0,
              }}
              transition={{
                opacity: { duration: 0.3 },
                rotate: { duration: 3, repeat: isSelected ? Number.POSITIVE_INFINITY : 0, ease: "linear" },
              }}
            />

            <div className="relative z-10 text-white">{icon}</div>

            {/* Sparkle effects */}
            <AnimatePresence>
              {(isHovered || isSelected) && (
                <>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Zap className="w-3 h-3 text-blue-400" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Title with typewriter effect */}
        <motion.h3
          className="text-2xl font-bold mb-4 text-center relative"
          animate={{
            color: isSelected ? "#93c5fd" : "#ffffff",
          }}
        >
          {name}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "2rem" }}
            animate={{
              width: isHovered || isSelected ? "100%" : "2rem",
              boxShadow: isSelected ? "0 0 20px rgba(59, 130, 246, 0.6)" : "none",
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-slate-300 mb-6 text-center leading-relaxed"
          animate={{
            color: isHovered ? "#cbd5e1" : "#94a3b8",
          }}
        >
          {description}
        </motion.p>

        {/* Stats container with enhanced design */}
        <motion.div
          className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 mb-6 border border-slate-600/30 overflow-hidden"
          animate={{
            borderColor: isSelected ? "rgba(59, 130, 246, 0.5)" : "rgba(148, 163, 184, 0.3)",
            backgroundColor: isSelected ? "rgba(30, 64, 175, 0.1)" : "rgba(30, 41, 59, 0.6)",
          }}
          whileHover={{
            backgroundColor: "rgba(30, 64, 175, 0.05)",
          }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10 space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </span>
                <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                  <motion.span
                    className="font-bold text-xl"
                    animate={{
                      color: isSelected ? "#60a5fa" : "#3b82f6",
                      textShadow: isSelected ? "0 0 10px rgba(59, 130, 246, 0.5)" : "none",
                    }}
                  >
                    {stat.value}
                  </motion.span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA button */}
        <motion.div className="mt-auto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-blue-400/50 text-blue-300 hover:text-blue-200 rounded-xl py-3 group transition-all duration-300"
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
              animate={{
                opacity: isSelected ? [0.1, 0.3, 0.1] : 0.1,
              }}
              transition={{ duration: 2, repeat: isSelected ? Number.POSITIVE_INFINITY : 0 }}
            />

            <span className="relative z-10 font-medium">Explorar Agente</span>
            <motion.div
              className="relative z-10 ml-2"
              animate={isSelected ? { x: [0, 8, 0] } : {}}
              transition={{
                repeat: isSelected ? Number.POSITIVE_INFINITY : 0,
                repeatDelay: 2,
                duration: 0.6,
              }}
            >
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.8 }}
            />
          </Button>
        </motion.div>

        {/* Selection indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
