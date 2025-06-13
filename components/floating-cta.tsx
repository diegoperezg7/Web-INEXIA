"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    const scrollHandler = () => {
      if (window.scrollY > window.innerHeight && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", scrollHandler)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", scrollHandler)
    }
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-4 z-50 max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-lg rounded-xl border border-blue-500/30 p-4 shadow-lg shadow-blue-500/10">
            <button
              className="absolute top-2 right-2 text-blue-300 hover:text-white"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-semibold mb-2 text-white">¿Listo para automatizar tu negocio?</h3>
            <p className="text-blue-100/80 text-sm mb-4">
              Solicita una demo gratuita y descubre cómo la IA puede transformar tu empresa.
            </p>

            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 group"
            >
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
