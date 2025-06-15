"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Search, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    category: "Recursos Humanos",
    tags: ["reclutamiento", "onboarding", "talento", "automatización"],
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
    category: "Atención al Cliente",
    tags: ["soporte", "chat", "24/7", "personalización"],
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
    category: "Finanzas",
    tags: ["facturación", "pagos", "reportes", "contabilidad"],
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
    category: "Marketing",
    tags: ["campañas", "contenido", "ROI", "automatización"],
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
    category: "Administración",
    tags: ["documentos", "tareas", "productividad", "gestión"],
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
    category: "Legal",
    tags: ["documentos", "revisión", "cumplimiento", "legal"],
  },
]

const categories = ["Todos", ...Array.from(new Set(agents.map((agent) => agent.category)))]

export function AgentGrid() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesCategory = selectedCategory === "Todos" || agent.category === selectedCategory
      const matchesSearch =
        searchTerm === "" ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

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
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  }

  const filterVariants = {
    initial: { opacity: 0, height: 0 },
    animate: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <motion.div className="relative w-full" variants={containerVariants} initial="initial" animate="animate">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 12, repeat: Number.POSITIVE_INFINITY },
          }}
        />
      </div>

      {/* Header with search and filters */}
      <div className="relative z-10 mb-12">
        <motion.div
          className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Buscar agentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-slate-900/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl backdrop-blur-sm"
              />
              {searchTerm && (
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  onClick={() => setSearchTerm("")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Filter toggle */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-700/50 bg-slate-900/50 text-slate-300 hover:bg-slate-800/70 hover:text-white hover:border-blue-500/30 backdrop-blur-sm rounded-xl"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {(selectedCategory !== "Todos" || searchTerm) && (
                <motion.div
                  className="ml-2 w-2 h-2 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Expandable filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              variants={filterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-6 overflow-hidden"
            >
              <div className="bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                  Categorías
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 hover:text-white border border-slate-600/30"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                      {selectedCategory === category && (
                        <motion.div
                          className="ml-2 inline-block w-2 h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Clear filters */}
                {(selectedCategory !== "Todos" || searchTerm) && (
                  <motion.div
                    className="mt-4 pt-4 border-t border-slate-700/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("Todos")
                        setSearchTerm("")
                      }}
                      className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Limpiar filtros
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results counter */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-slate-400">
          {filteredAgents.length === 0 ? (
            <span className="text-amber-400">No se encontraron agentes</span>
          ) : (
            <>
              Mostrando <span className="text-blue-400 font-semibold">{filteredAgents.length}</span> de{" "}
              <span className="text-purple-400 font-semibold">{agents.length}</span> agentes
            </>
          )}
        </p>
      </motion.div>

      {/* Agents grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10" layout>
        <AnimatePresence mode="popLayout">
          {filteredAgents.length === 0 ? (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                <Search className="h-12 w-12 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No se encontraron agentes</h3>
              <p className="text-slate-500 text-center max-w-md">
                Intenta ajustar tus filtros o términos de búsqueda para encontrar el agente perfecto para tu negocio.
              </p>
              <Button
                variant="outline"
                className="mt-6 border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-500/30"
                onClick={() => {
                  setSelectedCategory("Todos")
                  setSearchTerm("")
                }}
              >
                Ver todos los agentes
              </Button>
            </motion.div>
          ) : (
            filteredAgents.map((agent, index) => (
              <motion.div key={agent.name} variants={itemVariants} layout layoutId={agent.name} className="h-full">
                <AgentCard
                  icon={agent.icon}
                  name={agent.name}
                  description={agent.description}
                  stats={agent.stats}
                  gradient={agent.gradient}
                  type={agent.type}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Call to action */}
      {filteredAgents.length > 0 && (
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h3>
            <p className="text-slate-300 mb-6">
              Creamos agentes personalizados para las necesidades específicas de tu negocio
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Solicitar Agente Personalizado</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
