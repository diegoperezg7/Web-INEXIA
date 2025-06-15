"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, MessageSquare, BarChart3, TrendingUp, FileText, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const agents = [
  {
    icon: <Users className="h-8 w-8" />,
    name: "TalentBot",
    description:
      "Automatiza procesos de reclutamiento y onboarding con IA avanzada para optimizar la selección de talento.",
    stats: [
      { label: "Tiempo de contratación", value: "-40%" },
      { label: "Satisfacción candidatos", value: "+25%" },
    ],
    category: "Recursos Humanos",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    name: "ClientCare AI",
    description: "Asistente de atención al cliente 24/7 con respuestas personalizadas y resolución inteligente.",
    stats: [
      { label: "Tiempo de respuesta", value: "-85%" },
      { label: "Satisfacción cliente", value: "+30%" },
    ],
    category: "Atención al Cliente",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    name: "FinanceFlow",
    description: "Automatiza facturación, pagos y reportes financieros con precisión y eficiencia total.",
    stats: [
      { label: "Tiempo administrativo", value: "-60%" },
      { label: "Precisión", value: "+99.5%" },
    ],
    category: "Finanzas",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    name: "MarketingWise",
    description: "Optimiza campañas y genera contenido automáticamente para maximizar el ROI de marketing.",
    stats: [
      { label: "ROI campañas", value: "+35%" },
      { label: "Tiempo creación", value: "-70%" },
    ],
    category: "Marketing",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    name: "OfficeAssist",
    description: "Automatiza tareas administrativas y gestión documental para aumentar la productividad.",
    stats: [
      { label: "Productividad", value: "+45%" },
      { label: "Errores", value: "-90%" },
    ],
    category: "Administración",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    name: "LegalAssist",
    description: "Genera y revisa documentos legales automáticamente con cumplimiento normativo garantizado.",
    stats: [
      { label: "Tiempo revisión", value: "-75%" },
      { label: "Cumplimiento", value: "+99%" },
    ],
    category: "Legal",
  },
]

export function AgentCarouselPro() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, agents.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const slideWidth = 100 / itemsPerView
  const translateX = -currentIndex * slideWidth

  return (
    <div className="relative w-full">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Agentes Especializados</h3>
          <p className="text-slate-400">Soluciones de IA para cada área de tu negocio</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            transform: `translateX(${translateX}%)`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              className="flex-shrink-0"
              style={{ width: `calc(${slideWidth}% - 1rem)` }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 h-full hover:border-slate-600/50 transition-colors">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400">
                      {agent.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{agent.name}</h4>
                      <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                        {agent.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{agent.description}</p>

                {/* Stats */}
                <div className="space-y-3">
                  {agent.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{stat.label}</span>
                      <span className="font-semibold text-blue-400">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full mt-6 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30 border border-slate-700/50 hover:border-blue-600/30"
                >
                  Ver detalles
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-500" : "bg-slate-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
