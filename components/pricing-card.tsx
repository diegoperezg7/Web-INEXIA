"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  gradient: string
  borderColor: string
  buttonVariant: "default" | "outline"
  highlighted?: boolean
}

export function PricingCard({
  title,
  price,
  description,
  features,
  gradient,
  borderColor,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} backdrop-blur-sm rounded-xl border ${borderColor} p-6 flex flex-col relative ${highlighted ? "ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/20" : ""}`}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full">
          Recomendado
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>

      <div className="mb-4">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-blue-200/70 ml-1">/mes</span>
      </div>

      <p className="text-blue-100/70 mb-6">{description}</p>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
            <span className="text-blue-100/80">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={buttonVariant}
        className={`w-full ${buttonVariant === "default" ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40" : "border-blue-500/50 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300"}`}
      >
        Seleccionar
      </Button>
    </motion.div>
  )
}
