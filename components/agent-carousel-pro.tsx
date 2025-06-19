"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, MessageSquare, BarChart3, TrendingUp, FileText, Shield, Sparkles, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

const agents = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    name: "FinanceFlow",
    description: "Agente de contabilidad (facturación, informes, alertas de pagos).",
    stats: [
      { label: "Automatización de facturación", value: "Sí" },
      { label: "Alertas de pagos", value: "Sí" },
    ],
    category: "Finanzas",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    name: "MarketingWise AI",
    description: "Planificación y publicación automatizada de contenido.",
    stats: [
      { label: "Automatización de publicaciones", value: "Sí" },
      { label: "Planificación IA", value: "Sí" },
    ],
    category: "Marketing",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    name: "ClientCare AI",
    description: "Atención al cliente por email o formularios.",
    stats: [
      { label: "Soporte 24/7", value: "Sí" },
      { label: "Automatización de respuestas", value: "Sí" },
    ],
    category: "Atención al Cliente",
  },
  {
    icon: <Users className="h-8 w-8" />,
    name: "TalentBot",
    description: "Reclutamiento y RRHH automatizado.",
    stats: [
      { label: "Automatización de RRHH", value: "Sí" },
      { label: "Reclutamiento IA", value: "Sí" },
    ],
    category: "Recursos Humanos",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    name: "LegalAssist AI",
    description: "Gestión de documentación legal básica.",
    stats: [
      { label: "Documentos legales", value: "Sí" },
      { label: "Automatización básica", value: "Sí" },
    ],
    category: "Legal",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    name: "OfficeAssist AI",
    description: "Asistencia administrativa general.",
    stats: [
      { label: "Tareas administrativas", value: "Sí" },
      { label: "Gestión documental", value: "Sí" },
    ],
    category: "Administración",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    name: "DataInsight AI",
    description: "Análisis de datos en lenguaje natural y automatizado.",
    stats: [
      { label: "Análisis automatizado", value: "Sí" },
      { label: "Lenguaje natural", value: "Sí" },
    ],
    category: "Datos",
  },
  {
    icon: <Users className="h-8 w-8" />,
    name: "ClinicFlow AI",
    description: "Automatiza la confirmación y gestión de citas médicas.",
    stats: [
      { label: "Automatización de citas", value: "Sí" },
      { label: "Integraciones externas", value: "Sí" },
    ],
    category: "Salud",
  },
]

const agentBenefits = {
  "FinanceFlow": [
    "Ahorro de tiempo administrativo: -60%",
    "Precisión en reportes: +99.5%",
    "Alertas automáticas de pagos"
  ],
  "MarketingWise AI": [
    "Reducción de tiempo en creación de contenido: -70%",
    "Incremento del ROI en campañas: +35%",
    "Publicaciones programadas 24/7"
  ],
  "ClientCare AI": [
    "Reducción del tiempo de respuesta: -85%",
    "Satisfacción del cliente: +30%",
    "Soporte automatizado 24/7"
  ],
  "TalentBot": [
    "Reducción del tiempo de contratación: -40%",
    "Satisfacción de candidatos: +25%",
    "Automatización de onboarding"
  ],
  "LegalAssist AI": [
    "Reducción del tiempo de revisión: -75%",
    "Cumplimiento normativo: +99%",
    "Documentos legales listos al instante"
  ],
  "OfficeAssist AI": [
    "Productividad administrativa: +45%",
    "Reducción de errores: -90%",
    "Gestión documental automatizada"
  ],
  "DataInsight AI": [
    "Análisis automatizado de datos: +80% más rápido",
    "Decisiones basadas en datos en minutos",
    "Reportes en lenguaje natural"
  ],
  "ClinicFlow AI": [
    "Reducción de ausencias a citas: -30%",
    "Automatización de recordatorios y seguimientos",
    "Encuestas post-visita automáticas"
  ]
}

// Mapeo de detalles completos para cada agente
const agentDetails: Record<string, { icon: string; title: string; description: string; bullets: string[]; resultados: string }> = {
  "FinanceFlow": {
    icon: "💼",
    title: "FinanceFlow: Agente de Contabilidad",
    description: "Optimiza tu gestión contable con un sistema que automatiza la generación de facturas, el seguimiento de ingresos y gastos, y la creación de informes financieros.",
    bullets: [
      "Emite facturas automáticamente.",
      "Envía recordatorios de pago.",
      "Genera reportes contables en segundos.",
      "Detecta anomalías y vencimientos."
    ],
    resultados: "Ahorro de tiempo en tareas repetitivas y reducción de errores contables hasta en un 20%."
  },
  "MarketingWise AI": {
    icon: "📱",
    title: "MarketingWise AI: Automatización de Contenido",
    description: "Planifica, genera y publica contenido en redes sociales de forma automática, con IA adaptada a tu marca.",
    bullets: [
      "Generación de textos e imágenes para RRSS.",
      "Programación y publicación multicanal.",
      "Aprobación previa del contenido.",
      "Notificaciones automáticas."
    ],
    resultados: "Mejora del engagement y reducción del tiempo de creación de contenido en más de un 60%."
  },
  "ClientCare AI": {
    icon: "💬",
    title: "ClientCare AI: Atención al Cliente Inteligente",
    description: "Automatiza la gestión de correos y formularios con respuestas inteligentes y seguimiento continuo.",
    bullets: [
      "Lee e interpreta mensajes entrantes.",
      "Responde automáticamente con lenguaje natural.",
      "Deriva casos críticos a humanos.",
      "Registra métricas de atención y satisfacción."
    ],
    resultados: "Reduce los tiempos de respuesta hasta en un 50% y mejora la experiencia del cliente."
  },
  "TalentBot": {
    icon: "👥",
    title: "TalentBot: RRHH y Reclutamiento Automatizado",
    description: "Transforma tu proceso de selección con IA que clasifica CVs, programa entrevistas y publica ofertas.",
    bullets: [
      "Filtrado automático de candidatos.",
      "Clasificación por perfil y compatibilidad.",
      "Publicación masiva en portales de empleo.",
      "Coordinación de entrevistas."
    ],
    resultados: "Reduce en un 30% el tiempo de contratación y aumenta la calidad del talento seleccionado."
  },
  "LegalAssist AI": {
    icon: "⚖️",
    title: "LegalAssist AI: Soporte Legal Automatizado",
    description: "Gestión inteligente de documentos legales y consultas frecuentes.",
    bullets: [
      "Revisión de contratos estándar.",
      "Detección de cláusulas clave y riesgos.",
      "Organización de documentos legales.",
      "Asistencia básica para compliance."
    ],
    resultados: "Acelera procesos legales en un 40% y minimiza riesgos por omisiones."
  },
  "OfficeAssist AI": {
    icon: "📝",
    title: "OfficeAssist AI: Asistente Administrativo",
    description: "Tu asistente virtual para tareas diarias de oficina.",
    bullets: [
      "Gestión de agendas y reuniones.",
      "Automatización de tareas administrativas.",
      "Recordatorios y seguimiento.",
      "Organización de documentos y correos."
    ],
    resultados: "Libera hasta un 20% del tiempo del equipo administrativo."
  },
  "DataInsight AI": {
    icon: "📊",
    title: "DataInsight AI: Análisis de Datos Automatizado",
    description: "Obtén insights accionables con análisis de datos en lenguaje natural y reportes automáticos.",
    bullets: [
      "Conecta con tus fuentes de datos (Airtable, Google Sheets, etc.).",
      "Genera dashboards en tiempo real.",
      "Responde preguntas de negocio con IA.",
      "Detecta patrones y oportunidades de crecimiento."
    ],
    resultados: "Mejora la toma de decisiones y reduce los tiempos de análisis hasta en un 70%."
  },
  "ClinicFlow AI": {
    icon: "🏥",
    title: "ClinicFlow AI: Automatización para Clínicas",
    description: "Automatiza la confirmación y gestión de citas médicas, enviando recordatorios y mensajes por WhatsApp de forma totalmente automática.",
    bullets: [
      "Automatiza recordatorios y confirmaciones de cita (WhatsApp, email, SMS).",
      "Integra con Google Calendar y plataformas de reservas.",
      "Envía encuestas post-visita y seguimientos automáticos.",
      "Centraliza la comunicación y disponibilidad."
    ],
    resultados: "Reduce ausencias, mejora la satisfacción del paciente y optimiza la ocupación de agenda."
  }
}

export function AgentCarouselPro() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [openAgent, setOpenAgent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Nuevo cálculo de desplazamiento en píxeles
  const gapPx = 24 // gap-6 = 1.5rem = 24px
  const slidePx = containerRef.current
    ? (containerRef.current.offsetWidth - gapPx * (itemsPerView - 1)) / itemsPerView
    : 0
  const translateXPx = -(currentIndex * (slidePx + gapPx))

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
          ref={containerRef}
          className="flex gap-6 py-6 relative"
          animate={{
            x: translateXPx,
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
              className="flex-shrink-0 h-full flex"
              style={{ width: slidePx ? `${slidePx}px` : undefined, minHeight: '280px' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 4px 24px 0 rgba(30,41,59,0.12)', zIndex: 20 }}
            >
              <div className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 w-full flex flex-col items-center h-full min-h-[280px] transition-all duration-300 overflow-visible">
                {/* Icono grande y centrado */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-2 mt-2">
                  <span className="text-3xl md:text-4xl text-blue-500">{agent.icon}</span>
                </div>
                {/* Nombre y categoría centrados */}
                <h4 className="font-bold text-slate-900 dark:text-white text-lg md:text-xl text-center mb-0.5">{agent.name}</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 text-center block">
                  <span className="inline-block rounded-full px-3 py-1 bg-slate-900/70 dark:bg-slate-800/80 backdrop-blur text-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent font-semibold">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent font-semibold">
                      {agent.category}
                    </span>
                  </span>
                </span>
                {/* Descripción corta */}
                <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base text-center mb-3 leading-snug line-clamp-2 min-h-[32px]">{agent.description}</p>
                {/* Beneficios en columna, legibles y ocupando todo el ancho */}
                <div className="flex flex-col gap-2 mb-4 w-full min-h-[60px]">
                  {agentBenefits[agent.name as keyof typeof agentBenefits]?.map((benefit: string, i: number) => (
                    <span key={i} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-200 text-sm font-medium border border-blue-100 dark:border-blue-900 w-full">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{benefit}</span>
                    </span>
                  ))}
                </div>
                {/* Espaciador para empujar el botón abajo */}
                <div className="flex-grow" />
                {/* CTA simple */}
                <Button
                  variant="outline"
                  className="w-full mt-2 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs py-2"
                  onClick={() => setOpenAgent(agent.name)}
                >
                  Ver detalles
                </Button>
              </div>
              {/* Modal de detalles */}
              <DialogPrimitive.Root open={openAgent === agent.name} onOpenChange={open => setOpenAgent(open ? agent.name : null)}>
                <DialogPrimitive.Portal>
                  <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 z-50 animate-fade-in" />
                  <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-blue-100 dark:border-blue-800 overflow-y-auto max-h-[90vh] animate-fade-in">
                    <button className="absolute top-4 right-4 text-slate-400 hover:text-blue-500" onClick={() => setOpenAgent(null)}>
                      <X className="w-6 h-6" />
                    </button>
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <span className="text-4xl">{agentDetails[agent.name].icon}</span>
                      <h2 className="text-xl font-bold text-center text-blue-900 dark:text-blue-200 mb-1">{agentDetails[agent.name].title}</h2>
                      <p className="text-slate-700 dark:text-slate-200 text-center mb-2">{agentDetails[agent.name].description}</p>
                    </div>
                    <ul className="mb-4 space-y-2">
                      {agentDetails[agent.name].bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-blue-800 dark:text-blue-100 text-sm"><span className="mt-1">🔹</span> <span>{b}</span></li>
                      ))}
                    </ul>
                    <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-3 text-blue-900 dark:text-blue-200 text-sm font-semibold text-center">
                      {agentDetails[agent.name].resultados}
                    </div>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              </DialogPrimitive.Root>
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
