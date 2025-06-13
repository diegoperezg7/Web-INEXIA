"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { MenuBar } from "@/components/menu-bar"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  ChevronDown,
  Users,
  Bot,
  Briefcase,
  BarChart3,
  MessageSquare,
  FileText,
  Shield,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/components/particles-background"
import { HeroGlow } from "@/components/hero-glow"
import { ServiceCard } from "@/components/service-card"
import { AgentCard } from "@/components/agent-card"
import { StatCard } from "@/components/stat-card"
import { ContactForm } from "@/components/contact-form"
import { CtaButton } from "@/components/cta-button"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionHeight = section.getBoundingClientRect().height

        if (sectionTop < window.innerHeight / 2 && sectionTop > -sectionHeight / 2) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-black/50 backdrop-blur-lg border-b border-blue-500/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image
                src="/logo.png"
                alt="NeuraX"
                width={80}
                height={80}
                className="h-20 w-auto object-contain transition-all duration-300"
              />
            </motion.div>
          </div>

          <div className="hidden md:block">
            <MenuBar />
          </div>

          <Button
            variant="outline"
            className="hidden md:flex border-blue-500/50 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 relative overflow-hidden group"
            onClick={() => {
              const element = document.getElementById("cta")
              if (element) {
                window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-10">Solicitar Demo</span>
            <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-blue-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-8">
              <Button variant="ghost" size="icon" className="text-blue-400" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-6">
              {[
                { name: "Inicio", href: "#hero" },
                { name: "Beneficios", href: "#benefits" },
                { name: "Servicios", href: "#services" },
                { name: "Agentes", href: "#agents" },
                { name: "Contacto", href: "#cta" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-xl font-medium ${
                    activeSection === item.href.substring(1) ? "text-blue-400" : "text-white hover:text-blue-300"
                  } transition-colors relative group overflow-hidden`}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = item.href.replace("#", "")
                    const element = document.getElementById(targetId)

                    if (element) {
                      setMobileMenuOpen(false)
                      window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </nav>

            <div className="mt-12">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative overflow-hidden group"
                onClick={() => {
                  setMobileMenuOpen(false)
                  const element = document.getElementById("cta")
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                <span className="relative z-10">Solicitar Demo</span>
                <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <HeroGlow />

        <motion.div className="container mx-auto px-4 py-20 text-center z-10" style={{ opacity, scale }}>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-zinc-300 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Agentes de{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
              IA
            </span>{" "}
            que trabajan para ti{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">
              24/7
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aumenta la eficiencia, reduce costes, escala sin límites.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CtaButton text="Solicita una demo gratuita" className="size-lg" />

            <Button
              variant="outline"
              size="lg"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 relative overflow-hidden group"
              onClick={() => {
                const element = document.getElementById("agents")
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                  })
                }
              }}
            >
              <span className="relative z-10">Descubre tu Solución</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
            </Button>
          </motion.div>

          <motion.div
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="aspect-video bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur rounded-xl border border-blue-500/20 flex items-center justify-center relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all duration-700"></div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-blue-500/30 rounded-tl"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-500/30 rounded-tr"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-blue-500/30 rounded-bl"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-blue-500/30 rounded-br"></div>

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Cambiamos a una imagen directa en lugar de usar Next.js Image para evitar problemas de optimización */}
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura_de_pantalla_2025-04-12_115537-removebg-preview%20%281%29-Y9mMLvfvsD4U6yEFAGjItyStnF1prK.png"
                    alt="Flujo de trabajo de automatización NeuraX"
                    className="w-full h-full object-contain"
                  />
                </motion.div>

                <h3 className="text-xl font-semibold mt-4 text-white">Flujos de Trabajo Inteligentes</h3>
                <p className="text-blue-200/70">Automatización avanzada que conecta tus aplicaciones y servicios</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-blue-400/80 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <ChevronDown className="h-8 w-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-xl -translate-x-1/2"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10 tracking-tight">
              Resultados Extraordinarios Garantizados
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto relative z-10">
              Optimizamos tus procesos con inteligencia artificial para multiplicar la productividad de tu equipo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatCard
              icon={<Clock className="h-8 w-8 text-blue-400" />}
              title="Ahorra tiempo operativo"
              value="-30%"
              description="Reduce el tiempo dedicado a tareas repetitivas"
            />

            <StatCard
              icon={<TrendingUp className="h-8 w-8 text-purple-400" />}
              title="Multiplica la productividad"
              value="+40%"
              description="Incrementa la eficiencia de tu equipo"
            />

            <StatCard
              icon={<Zap className="h-8 w-8 text-blue-400" />}
              title="Resultados desde el primer día"
              value="24h"
              description="Implementación rápida y sin complicaciones"
            />
          </div>

          <div className="text-center relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 -bottom-10 w-40 h-40 bg-purple-500/5 rounded-full blur-xl -translate-x-1/2"></div>

            <h3 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text animate-pulse relative z-10 tracking-tight">
              Menos código. Más impacto. Implementación exprés.
            </h3>

            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden group"
              onClick={() => {
                const element = document.getElementById("services")
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                  })
                }
              }}
            >
              <span className="relative z-10">Descubre cómo funciona</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10" />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative z-10 bg-gradient-to-b from-transparent to-blue-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 -top-10 w-40 h-40 bg-blue-500/5 rounded-full blur-xl -translate-x-1/2"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10 tracking-tight">
              Tecnología Revolucionaria a tu Alcance
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto relative z-10">
              Soluciones de IA y automatización personalizadas para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Briefcase className="h-10 w-10" />}
              title="Consultoría Estratégica"
              description="Analizamos tu negocio para identificar oportunidades de automatización e IA"
              gradient="from-blue-600 to-blue-400"
            />

            <ServiceCard
              icon={<Bot className="h-10 w-10" />}
              title="Agentes IA Especializados"
              description="Desarrollamos asistentes inteligentes adaptados a tus necesidades específicas"
              gradient="from-purple-600 to-blue-400"
            />

            <ServiceCard
              icon={<Zap className="h-10 w-10" />}
              title="Automatización No-Code"
              description="Implementamos flujos de trabajo automatizados sin necesidad de programación"
              gradient="from-blue-400 to-purple-600"
            />

            <ServiceCard
              icon={<Users className="h-10 w-10" />}
              title="Formación y Soporte"
              description="Capacitamos a tu equipo y ofrecemos soporte continuo para maximizar resultados"
              gradient="from-purple-400 to-blue-600"
            />
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 -top-10 w-40 h-40 bg-purple-500/5 rounded-full blur-xl -translate-x-1/2"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10 tracking-tight">
              Agentes Inteligentes
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto relative z-10">
              Nuestros agentes de IA especializados automatizan tareas específicas de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AgentCard
              icon={<Users className="h-10 w-10" />}
              name="TalentBot"
              description="Automatiza procesos de reclutamiento y onboarding"
              stats={[
                { label: "Tiempo de contratación", value: "-40%" },
                { label: "Satisfacción candidatos", value: "+25%" },
              ]}
              gradient="from-blue-600 to-blue-400"
            />

            <AgentCard
              icon={<MessageSquare className="h-10 w-10" />}
              name="ClientCare AI"
              description="Asistente de atención al cliente 24/7 con respuestas personalizadas"
              stats={[
                { label: "Tiempo de respuesta", value: "-85%" },
                { label: "Satisfacción cliente", value: "+30%" },
              ]}
              gradient="from-purple-600 to-blue-400"
            />

            <AgentCard
              icon={<BarChart3 className="h-10 w-10" />}
              name="FinanceFlow"
              description="Automatiza facturación, pagos y reportes financieros"
              stats={[
                { label: "Tiempo administrativo", value: "-60%" },
                { label: "Precisión", value: "+99.5%" },
              ]}
              gradient="from-blue-400 to-purple-600"
            />

            <AgentCard
              icon={<TrendingUp className="h-10 w-10" />}
              name="MarketingWise"
              description="Optimiza campañas y genera contenido automáticamente"
              stats={[
                { label: "ROI campañas", value: "+35%" },
                { label: "Tiempo creación", value: "-70%" },
              ]}
              gradient="from-purple-400 to-blue-600"
            />

            <AgentCard
              icon={<FileText className="h-10 w-10" />}
              name="OfficeAssist"
              description="Automatiza tareas administrativas y gestión documental"
              stats={[
                { label: "Productividad", value: "+45%" },
                { label: "Errores", value: "-90%" },
              ]}
              gradient="from-blue-600 to-purple-400"
            />

            <AgentCard
              icon={<Shield className="h-10 w-10" />}
              name="LegalAssist"
              description="Genera y revisa documentos legales automáticamente"
              stats={[
                { label: "Tiempo revisión", value: "-75%" },
                { label: "Cumplimiento", value: "+99%" },
              ]}
              gradient="from-purple-600 to-blue-400"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 relative z-10 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px] rounded-2xl"></div>
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-purple-500/10 rounded-full blur-xl"></div>

            {/* Decorative corner accents */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-blue-500/30 rounded-tl"></div>
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-blue-500/30 rounded-tr"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-blue-500/30 rounded-bl"></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-blue-500/30 rounded-br"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text tracking-tight">
                ¿Cuánto tiempo más vas a perder haciendo lo mismo a mano?
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
              <p className="text-xl text-blue-100/70 max-w-2xl mx-auto">
                Automatiza tus procesos con IA y multiplica la productividad de tu equipo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div>
                <ContactForm />
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-500/10 p-6 mb-6 relative overflow-hidden group">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px] rounded-xl"></div>
                  <div className="absolute -right-10 -top-10 w-20 h-20 bg-blue-500/5 rounded-full blur-lg group-hover:bg-blue-500/10 transition-all duration-700"></div>
                  <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-purple-500/5 rounded-full blur-lg group-hover:bg-purple-500/10 transition-all duration-700"></div>

                  {/* Decorative corner accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-500/30 rounded-tl"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-blue-500/30 rounded-tr"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-blue-500/30 rounded-bl"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-500/30 rounded-br"></div>

                  <h3 className="text-xl font-semibold mb-4 text-blue-300 relative z-10">Beneficios inmediatos</h3>
                  <ul className="space-y-3 relative z-10">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                      <span>Implementación en días, no en meses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                      <span>Sin necesidad de conocimientos técnicos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                      <span>ROI medible desde la primera semana</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                      <span>Escalable según tus necesidades</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <CtaButton text="Solicita Demo" className="flex-1" />

                  <Button variant="outline" size="lg" />

                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-blue-500/50 text-blue-400 hover:bg-blue-950/30 hover:text-blue-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Habla con un Experto</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative z-10 border-t border-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Logo */}
            <div className="mb-4">
              <Image src="/logo.png" alt="NeuraX Logo" width={80} height={80} className="mx-auto" />
              <h3 className="text-xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Agencia de Inteligencia Artificial NeuraX
              </h3>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-4 mb-6">
              <a href="#" className="text-blue-400 hover:text-blue-300 relative group p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <div className="absolute -inset-2 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 relative group p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <div className="absolute -inset-2 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 relative group p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <div className="absolute -inset-2 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 relative group p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <div className="absolute -inset-2 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </div>

            {/* Contact Information */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a
                href="mailto:info@neurax.ai"
                className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                info@neurax.ai
              </a>

              <a
                href="tel:+34919030456"
                className="flex items-center text-blue-300 hover:text-blue-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +34 919 030 456
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center text-blue-300/60 relative">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-4 mx-auto"></div>
              &copy; {new Date().getFullYear()} NeuraX. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
