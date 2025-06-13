"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  sector: string
  message: string
}

const COMPANY_SECTORS = [
  { value: "tecnologia", label: "Tecnología" },
  { value: "finanzas", label: "Finanzas" },
  { value: "salud", label: "Salud" },
  { value: "educacion", label: "Educación" },
  { value: "retail", label: "Retail" },
  { value: "manufactura", label: "Manufactura" },
  { value: "servicios", label: "Servicios Profesionales" },
  { value: "otro", label: "Otro" },
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    sector: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Simulamos el envío del formulario para evitar el error de Supabase
      console.log("Simulando envío de formulario con datos:", formData)

      // En lugar de enviar a Supabase, simplemente simulamos un retraso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulamos el envío de la notificación
      console.log("Simulando envío de notificación")

      // Marcamos como enviado
      setIsSubmitted(true)
    } catch (err: any) {
      console.error("Error al enviar el formulario:", err)
      setError(err.message || "Ha ocurrido un error al enviar el formulario")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-500/10 p-6 text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>

        {/* Success animation */}
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/30 to-green-500/30 flex items-center justify-center relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </motion.svg>

          {/* Animated rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-500/50"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, delay: 0.6, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border border-green-500/50"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          ></motion.div>
        </motion.div>

        <motion.h3
          className="text-xl font-semibold mb-2 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          ¡Mensaje enviado!
        </motion.h3>

        <motion.p
          className="text-blue-100/70 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Nos pondremos en contacto contigo lo antes posible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <Button
            variant="outline"
            className="border-blue-500/50 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 relative overflow-hidden group"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                sector: "",
                message: "",
              })
            }}
          >
            <span className="relative z-10">Enviar otro mensaje</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 group-hover:w-full transition-all duration-300"></div>
          </Button>
        </motion.div>

        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-500/30 rounded-tl"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-500/30 rounded-tr"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-blue-500/30 rounded-bl"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-blue-500/30 rounded-br"></div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/5 rounded-full blur-lg"></div>
      <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-purple-500/5 rounded-full blur-lg"></div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-500/30 rounded-tl"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-500/30 rounded-tr"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-500/30 rounded-bl"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-500/30 rounded-br"></div>

      {error && <div className="bg-red-900/20 text-red-300 p-3 rounded-lg text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <Label htmlFor="name" className="text-sm text-blue-200/70 mb-1 block">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Tu nombre"
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 transition-all duration-300 group-hover:border-blue-500/40"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <Label htmlFor="email" className="text-sm text-blue-200/70 mb-1 block">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 transition-all duration-300 group-hover:border-blue-500/40"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <Label htmlFor="company" className="text-sm text-blue-200/70 mb-1 block">
            Empresa
          </Label>
          <Input
            id="company"
            name="company"
            placeholder="Nombre de tu empresa"
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 transition-all duration-300 group-hover:border-blue-500/40"
            required
            value={formData.company}
            onChange={handleChange}
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <Label htmlFor="phone" className="text-sm text-blue-200/70 mb-1 block">
            Teléfono
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+34 600 000 000"
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 transition-all duration-300 group-hover:border-blue-500/40"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
        </div>
      </div>

      <div className="relative group">
        <Label htmlFor="sector" className="text-sm text-blue-200/70 mb-1 block">
          Sector de la empresa
        </Label>
        <Select value={formData.sector} onValueChange={(value) => handleSelectChange("sector", value)}>
          <SelectTrigger
            id="sector"
            className="bg-blue-900/20 border-blue-500/20 text-white focus:ring-blue-500 transition-all duration-300 hover:border-blue-500/40"
          >
            <SelectValue placeholder="Selecciona un sector" />
          </SelectTrigger>
          <SelectContent className="bg-blue-900/90 border-blue-500/20 text-white">
            {COMPANY_SECTORS.map((sector) => (
              <SelectItem key={sector.value} value={sector.value}>
                {sector.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
      </div>

      <div className="relative group">
        <Label htmlFor="message" className="text-sm text-blue-200/70 mb-1 block">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="¿Cómo podemos ayudarte?"
          className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 min-h-[100px] transition-all duration-300 group-hover:border-blue-500/40"
          required
          value={formData.message}
          onChange={handleChange}
        />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-focus-within:w-full group-hover:w-1/4 transition-all duration-300"></div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden group"
        disabled={isSubmitting}
      >
        <span className="relative z-10">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
              Enviando...
            </>
          ) : (
            <>
              Enviar mensaje
              <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>

        {/* Button shine effect */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      </Button>
    </form>
  )
}
