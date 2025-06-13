"use client"

import { motion } from "framer-motion"

interface ProcessStepProps {
  number: string
  title: string
  description: string
  isFirst?: boolean
  isLast?: boolean
}

export function ProcessStep({ number, title, description, isFirst = false, isLast = false }: ProcessStepProps) {
  return (
    <div className="relative flex">
      {/* Connecting line */}
      {!isFirst && <div className="absolute top-0 left-6 w-0.5 h-8 bg-gradient-to-b from-transparent to-blue-500/50" />}
      {!isLast && (
        <div className="absolute top-14 left-6 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent" />
      )}

      {/* Step content */}
      <motion.div
        className="flex items-start mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-6 z-10">
          <span className="text-white font-bold">{number}</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-blue-100/70">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}
