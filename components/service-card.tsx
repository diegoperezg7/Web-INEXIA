"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
  details: string[]
  open: boolean
  onToggle: () => void
}

export function ServiceCard({ icon, title, description, gradient, details, open, onToggle }: ServiceCardProps) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 flex flex-col overflow-visible group transition-all duration-500 hover:scale-[1.03] shadow-lg"
      whileHover={{ boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)', zIndex: 20 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Icono grande y decorado */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-400 flex items-center justify-center mb-4 mx-auto shadow-lg">
        <span className="text-white text-2xl">{icon}</span>
      </div>
      {/* Título */}
      <h3 className="text-xl font-bold mb-2 text-white text-center">
        {title}
      </h3>
      {/* Descripción */}
      <p className="text-blue-100/80 mb-6 text-center text-base">
        {description}
      </p>
      {/* Botón toggle y contenido expandible decorado */}
      <button
        className={`w-full mt-auto rounded-lg py-2 px-4 flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus:outline-none border-2 border-transparent bg-gradient-to-r from-blue-700/20 to-purple-700/20 hover:from-blue-800/30 hover:to-purple-800/30 ${open ? 'border-blue-400 shadow-lg' : 'border-blue-500/30'}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`details-${title}`}
        type="button"
      >
        <span className="text-blue-200 text-base font-semibold tracking-wide">{open ? 'Ver menos' : 'Ver más'}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {open ? <ChevronUp className="h-5 w-5 text-blue-300" /> : <ChevronDown className="h-5 w-5 text-blue-300" />}
        </motion.span>
      </button>
      <motion.div
        id={`details-${title}`}
        initial={false}
        animate={open ? { height: 'auto', opacity: 1, marginTop: 28 } : { height: 0, opacity: 0, marginTop: 0 }}
        transition={{ height: { duration: 0.38 }, opacity: { duration: 0.28 }, marginTop: { duration: 0.32 }, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden w-full"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div className="bg-gradient-to-br from-blue-900/70 to-purple-900/60 border border-blue-500/30 rounded-xl shadow-xl px-5 py-5 flex flex-col gap-3 animate-fade-in">
          <ul className="space-y-3">
            {details.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-blue-100/90 text-base">
                <span className="mt-1"><ChevronRight className="w-4 h-4 text-blue-400" /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
