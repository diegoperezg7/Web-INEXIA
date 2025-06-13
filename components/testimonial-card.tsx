"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  company: string
  rating: number
}

export function TestimonialCard({ quote, author, position, company, rating }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`} />
        ))}
      </div>

      <p className="text-blue-100 mb-6 italic">"{quote}"</p>

      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-blue-200/70 text-sm">
          {position}, {company}
        </p>
      </div>
    </motion.div>
  )
}
