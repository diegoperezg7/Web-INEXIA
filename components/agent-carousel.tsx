"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentCard } from "./agent-card"
import { Users, MessageSquare, BarChart3, TrendingUp, FileText, Shield } from "lucide-react"

const agents = [
  {
    icon: <Users className="h-10 w-10" />,
    name: "TalentBot",
    description: "Automatiza procesos de reclutamiento y onboarding con IA avanzada",
    stats: [
      { label: "Tiempo de contratación", value: "-40%" },
      { label: "Satisfacción candidatos", value: "+25%" },
    ],
    gradient: "from-blue-600 to-blue-400",
    type: "recruitment",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    name: "ClientCare AI",
    description: "Asistente de atención al cliente 24/7 con respuestas personalizadas",
    stats: [
      { label: "Tiempo de respuesta", value: "-85%" },
      { label: "Satisfacción cliente", value: "+30%" },
    ],
    gradient: "from-purple-600 to-blue-400",
    type: "customer",
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    name: "FinanceFlow",
    description: "Automatiza facturación, pagos y reportes financieros",
    stats: [
      { label: "Tiempo administrativo", value: "-60%" },
      { label: "Precisión", value: "+99.5%" },
    ],
    gradient: "from-blue-400 to-purple-600",
    type: "finance",
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    name: "MarketingWise",
    description: "Optimiza campañas y genera contenido automáticamente",
    stats: [
      { label: "ROI campañas", value: "+35%" },
      { label: "Tiempo creación", value: "-70%" },
    ],
    gradient: "from-purple-400 to-blue-600",
    type: "marketing",
  },
  {
    icon: <FileText className="h-10 w-10" />,
    name: "OfficeAssist",
    description: "Automatiza tareas administrativas y gestión documental",
    stats: [
      { label: "Productividad", value: "+45%" },
      { label: "Errores", value: "-90%" },
    ],
    gradient: "from-blue-600 to-purple-400",
    type: "office",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    name: "LegalAssist",
    description: "Genera y revisa documentos legales automáticamente",
    stats: [
      { label: "Tiempo revisión", value: "-75%" },
      { label: "Cumplimiento", value: "+99%" },
    ],
    gradient: "from-purple-600 to-blue-400",
    type: "legal",
  },
]

export function AgentCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // Responsive items per view
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, agents.length - itemsPerView)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, itemsPerView])

  const maxIndex = Math.max(0, agents.length - itemsPerView)

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(maxIndex) // Loop to end
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 50

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const slideWidth = 100 / itemsPerView
  const translateX = -currentIndex * slideWidth

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="relative w-full overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 10, repeat: Number.POSITIVE_INFINITY },
          }}
        />
      </div>

      {/* Enhanced navigation arrows */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-blue-400 hover:bg-slate-800/90 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-blue-500/10"
          onClick={prevSlide}
          disabled={isDragging}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </motion.div>

      <motion.div
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-blue-400 hover:bg-slate-800/90 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-blue-500/10"
          onClick={nextSlide}
          disabled={isDragging}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Auto-play control */}
      <motion.div className="absolute top-4 right-4 z-20" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          size="sm"
          className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-blue-400 hover:bg-slate-800/90 hover:text-blue-300 hover:border-blue-500/30 transition-all duration-300"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isAutoPlaying ? "Pausar" : "Reproducir"}
        </Button>
      </motion.div>

      {/* Carousel container */}
      <div ref={constraintsRef} className="relative px-20">
        <motion.div
          className="flex gap-8"
          animate={{
            transform: `translateX(${translateX}%)`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragStart={() => {
            setIsDragging(true)
            setIsAutoPlaying(false)
          }}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              className="flex-shrink-0"
              style={{ width: `calc(${slideWidth}% - 2rem)` }}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <AgentCard
                icon={agent.icon}
                name={agent.name}
                description={agent.description}
                stats={agent.stats}
                gradient={agent.gradient}
                type={agent.type}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced indicators */}
      <div className="flex justify-center mt-12 gap-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <motion.button
            key={index}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-500"
                : "w-4 h-4 bg-slate-600 hover:bg-slate-500"
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 0,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Enhanced progress bar */}
      <div className="mt-6 mx-auto w-80 h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full relative overflow-hidden"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Instructions with animation */}
      <motion.p
        className="text-center mt-6 text-slate-400 text-sm"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Arrastra, usa las flechas o deja que se reproduzca automáticamente
      </motion.p>
    </motion.div>
  )
}
