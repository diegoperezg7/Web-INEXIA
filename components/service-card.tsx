"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface ServiceExample {
  title: string
  description: string
  bullets: string[]
  resultado: string
}

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  gradient: string
  example: ServiceExample
}

export function ServiceCard({ icon, title, description, gradient, example }: ServiceCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 h-full flex flex-col overflow-visible group transition-all duration-500 hover:scale-[1.03]"
      whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)', zIndex: 20 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Icono grande y decorado */}
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 mx-auto`}>
        <span className="text-white text-3xl">{icon}</span>
      </div>
      {/* Título */}
      <h3 className="text-xl font-bold mb-2 text-white text-center">
        {title}
      </h3>
      {/* Descripción */}
      <p className="text-blue-100/80 mb-8 flex-grow text-center text-base">
        {description}
      </p>
      {/* Botón que abre el modal Dialog */}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button
            variant="outline"
            className="w-full mt-auto text-blue-400 border-blue-500/30 hover:bg-blue-900/20"
          >
            <span className="mr-2">Ver ejemplo</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-black/70 z-50 animate-fade-in" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-blue-100 dark:border-blue-800 overflow-y-auto max-h-[90vh] animate-fade-in">
            <button className="absolute top-4 right-4 text-blue-400 hover:text-blue-600" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-center text-blue-900 dark:text-blue-200 mb-1">{example.title}</h2>
              <p className="text-slate-700 dark:text-slate-200 text-center mb-2 text-base max-w-md">{example.description}</p>
            </div>
            <ul className="mb-4 space-y-2">
              {example.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-blue-800 dark:text-blue-100 text-base"><span className="mt-1">🔹</span> <span>{b}</span></li>
              ))}
            </ul>
            <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-4 text-blue-900 dark:text-blue-200 text-base font-semibold text-center shadow-inner">
              {example.resultado}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </motion.div>
  )
}
