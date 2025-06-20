"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { MenuBar } from "@/components/menu-bar"
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Zap, ChevronDown, Users, Bot, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "@/components/particles-background"
import { HeroGlow } from "@/components/hero-glow"
import { ServiceCard } from "@/components/service-card"
import { StatCard } from "@/components/stat-card"
import { ContactForm } from "@/components/contact-form"
import { CtaButton } from "@/components/cta-button"
import { AgentCarouselPro } from "@/components/agent-carousel-pro"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  const [openServices, setOpenServices] = useState<{ [key: string]: boolean }>({})

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
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const element = document.getElementById("hero")
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    })
                  }
                }}
              >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_23_abr_2025__09_00_18-removebg-preview-removebg-preview-OMu0aFJDRtDdZErB7Q2w9ee9e3p9dF.png"
                alt="NeuraX"
                  width={110}
                  height={110}
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300"
              />
              </div>
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
            <span className="relative z-10">Solicitar Información</span>
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
                <span className="relative z-10">Solicitar Información</span>
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
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_23_abr_2025__09_00_18-removebg-preview%20%281%29-qLXLYtKBm5sRI372qiQPuuVWV3nz9V.png"
              alt="NeuraX Logo"
              width={160}
              height={160}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </motion.div>

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
            <CtaButton text="Solicita información gratuita" className="size-lg" />

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
              <span className="relative z-10">Ver Agentes</span>
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
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:16px_16px]"></div>

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
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
            <h3 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text relative z-10 tracking-tight">
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
      <section id="services" className="py-20 relative z-10 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10 tracking-tight">
              Tecnología Revolucionaria a tu Alcance
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-blue-100/70 max-w-2xl mx-auto relative z-10">
              Soluciones de IA y automatización personalizadas para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            <ServiceCard
              icon={<Briefcase className="h-10 w-10" />}
              title="Consultoría Estratégica"
              description="Analizamos tu negocio para identificar oportunidades de automatización de tareas repetitivas."
              gradient="from-blue-600 to-blue-400"
              details={[
                "Diagnóstico completo de tus procesos",
                "Identificación de puntos de automatización prioritarios",
                "Plan de acción personalizado con soluciones aplicables"
              ]}
              open={!!openServices['Consultoría Estratégica']}
              onToggle={() => setOpenServices((prev) => ({ ...prev, ['Consultoría Estratégica']: !prev['Consultoría Estratégica'] }))}
            />

            <ServiceCard
              icon={<Bot className="h-10 w-10" />}
              title="Agentes de IA Especializados"
              description="Desarrollamos asistentes inteligentes adaptados a tus necesidades específicas."
              gradient="from-purple-600 to-blue-400"
              details={[
                "Agentes personalizados, diseñados desde cero según tus necesidades",
                "Agentes preconfigurados, adaptados a tu empresa",
                "Todo funciona desde el primer día, sin configuraciones técnicas"
              ]}
              open={!!openServices['Agentes de IA Especializados']}
              onToggle={() => setOpenServices((prev) => ({ ...prev, ['Agentes de IA Especializados']: !prev['Agentes de IA Especializados'] }))}
            />

            <ServiceCard
              icon={<Zap className="h-10 w-10" />}
              title="Automatización No-Code"
              description="Implementamos flujos de trabajo automatizados sin necesidad de programación."
              gradient="from-blue-400 to-purple-600"
              details={[
                "Automatización de procesos administrativos, clientes y contenido",
                "Eliminación de tareas repetitivas y cuellos de botella",
                "Soluciones entregadas listas para usar, sin aprendizaje técnico"
              ]}
              open={!!openServices['Automatización No-Code']}
              onToggle={() => setOpenServices((prev) => ({ ...prev, ['Automatización No-Code']: !prev['Automatización No-Code'] }))}
            />

            <ServiceCard
              icon={<Users className="h-10 w-10" />}
              title="Soporte y Mantenimiento"
              description="Nos encargamos del mantenimiento y del soporte continuo de tus soluciones implementadas."
              gradient="from-purple-400 to-blue-600"
              details={[
                "Resolución de incidencias",
                "Optimización y mejoras continuas",
                "Adaptación a cambios en procesos o necesidades"
              ]}
              open={!!openServices['Soporte y Mantenimiento']}
              onToggle={() => setOpenServices((prev) => ({ ...prev, ['Soporte y Mantenimiento']: !prev['Soporte y Mantenimiento'] }))}
            />
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10 tracking-tight">
              Nuestros Agentes de IA
            </h2>
            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mx-auto mb-1">
              Estos son ejemplos base que podemos adaptar a tu empresa. <span className="font-semibold text-blue-300">También creamos agentes totalmente personalizados desde cero.</span>
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-1"></div>
          </div>

          <div className="relative">
          <AgentCarouselPro />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 relative z-10 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            {/* Header Section */}
            <div className="text-center mb-16 relative z-10">
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full px-6 py-2 border border-blue-500/30">
                  <span className="text-blue-300 text-sm font-medium">🚀 Transformación Digital</span>
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                ¿Cuánto tiempo más vas a perder haciendo lo mismo a mano?
              </motion.h2>

              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              <motion.p
                className="text-xl text-blue-100/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Automatiza tus procesos con IA y multiplica la productividad de tu equipo
              </motion.p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Contact Form */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 text-white">Solicita Información Gratuita</h3>
                    <p className="text-blue-200/70 mb-6">
                      Descubre cómo la IA puede transformar tu negocio en menos de 30 minutos
                    </p>
                    <ContactForm />
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Benefits & Features */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Benefits Card */}
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-4">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-blue-300">Beneficios Inmediatos</h3>
                    </div>

                    <ul className="space-y-3">
                      {[
                        "Implementación en días, no en meses",
                        "Sin necesidad de conocimientos técnicos",
                        "ROI medible desde la primera semana",
                        "Escalable según tus necesidades",
                      ].map((benefit, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-100/80">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, label: "Tiempo ahorrado", value: "30%", color: "blue" },
                    { icon: TrendingUp, label: "Productividad", value: "+40%", color: "purple" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-blue-900/30 to-purple-900/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-4 relative overflow-hidden group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative z-10">
                        <div className="flex items-center mb-2">
                          <stat.icon className={`h-5 w-5 text-${stat.color}-400 mr-2`} />
                          <span className="text-sm text-blue-200/70">{stat.label}</span>
                        </div>
                        <p className={`text-2xl font-bold text-${stat.color}-300`}>{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action - Nueva versión profesional */}
                <motion.div
                  className="bg-gradient-to-br from-slate-100/90 to-blue-100/70 dark:from-blue-900/60 dark:to-purple-900/40 rounded-2xl border border-blue-500/10 shadow-xl p-8 text-center flex flex-col items-center gap-4 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-1">¿Prefieres hablar directamente?</h4>
                  <p className="text-blue-700 dark:text-blue-100/80 text-base mb-1">Nuestro equipo te responderá en menos de 24h.</p>
                  <p className="italic text-blue-500 dark:text-blue-300 text-base mb-3">“A veces una simple conversación lo cambia todo.”</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg">📩</span>
                    <span className="text-blue-800 dark:text-blue-200 font-semibold select-all">info@neurax.com</span>
                  </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <p className="text-blue-200/60 text-sm mb-3">Respuesta garantizada en menos de 24 horas</p>
                  <div className="flex justify-center items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-xs text-blue-300/70">Consulta gratuita</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-xs text-blue-300/70">Sin compromiso</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                      <span className="text-xs text-blue-300/70">100% personalizado</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
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
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const element = document.getElementById("hero")
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    })
                  }
                }}
              >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT_Image_23_abr_2025__09_00_18-removebg-preview-removebg-preview-OMu0aFJDRtDdZErB7Q2w9ee9e3p9dF.png"
                alt="NeuraX Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
              </div>
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
                href="mailto:info@neurax.com"
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
                info@neurax.com
              </a>

              <a
                href="tel:+34608524638"
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
                +34 608 52 46 38
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
