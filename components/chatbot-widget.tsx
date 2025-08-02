"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

interface Message {
  role: "user" | "bot"
  content: string
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: "user" as const, content: input }
    setMessages((msgs) => [...msgs, userMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("https://arizonicas1.app.n8n.cloud/webhook/3a846d60-e61c-489c-99bd-51c2cc510671/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      console.log("Respuesta del webhook:", data) // Para debug
      
      // Manejar diferentes formatos de respuesta
      let botResponse = "Sin respuesta"
      
      if (data.reply) {
        botResponse = data.reply
      } else if (data.message) {
        botResponse = data.message
      } else if (data.text) {
        botResponse = data.text
      } else if (data.content) {
        botResponse = data.content
      } else if (typeof data === 'string') {
        botResponse = data
      } else if (Array.isArray(data) && data.length > 0) {
        // Si es un array, tomar el primer elemento
        const firstItem = data[0]
        if (typeof firstItem === 'string') {
          botResponse = firstItem
        } else if (firstItem.reply) {
          botResponse = firstItem.reply
        } else if (firstItem.message) {
          botResponse = firstItem.message
        } else if (firstItem.text) {
          botResponse = firstItem.text
        } else if (firstItem.content) {
          botResponse = firstItem.content
        }
      } else if (data && typeof data === 'object') {
        // Si es un objeto, intentar encontrar cualquier propiedad que contenga texto
        const textProps = Object.values(data).filter(val => typeof val === 'string')
        if (textProps.length > 0) {
          botResponse = textProps[0]
        }
      }
      
      setMessages((msgs) => [...msgs, { role: "bot", content: botResponse }])
    } catch (error) {
      console.error("Error al conectar con el chatbot:", error) // Para debug
      setMessages((msgs) => [...msgs, { role: "bot", content: "Hubo un error al conectar con el chatbot." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[28rem] max-w-[90vw]"
          >
            <Card className="bg-gradient-to-br from-slate-900/20 to-slate-800/20 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-shine pointer-events-none" />
              
              {/* Partículas de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse delay-75" />
                <div className="absolute bottom-12 left-8 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse delay-150" />
              </div>

              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 border-b border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-white">
                  <Image 
                    src="/ChatGPT_Image_23_abr_2025__09_00_18-removebg-preview (1).png" 
                    alt="Nexi" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Nexi
                  </span>
                </CardTitle>
                <button 
                  onClick={() => {
                    console.log("Botón cerrar clickeado")
                    setOpen(false)
                  }} 
                  className="text-muted-foreground hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-blue-500/20 z-10 relative"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </CardHeader>
              
              <CardContent className="h-96 overflow-y-auto flex flex-col gap-3 px-4 py-3 bg-gradient-to-b from-slate-900/30 to-slate-800/30 relative">
                {messages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-muted-foreground text-base text-center flex flex-col items-center justify-center h-full gap-4"
                  >
                    <Image 
                      src="/ChatGPT_Image_23_abr_2025__09_00_18-removebg-preview (1).png" 
                      alt="Nexi" 
                      width={64} 
                      height={64} 
                      className="object-contain"
                    />
                    <div>
                    <p className="font-medium text-blue-300">¡Hola! Soy tu asistente IA</p>
                    <p className="text-sm text-muted-foreground mt-1">¿En qué puedo ayudarte hoy?</p>
                    </div>
                  </motion.div>
                )}
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === "user" 
                          ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                          : "bg-gradient-to-br from-purple-500 to-purple-600"
                      }`}>
                        {msg.role === "user" ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line shadow-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md"
                          : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 rounded-bl-md border border-slate-600/50"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl rounded-bl-md px-4 py-2 border border-slate-600/50">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75" />
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              <CardFooter className="p-4 pt-2 border-t border-blue-500/20 bg-gradient-to-r from-slate-800/60 to-slate-900/60">
                <form
                  className="flex gap-2 w-full"
                  onSubmit={e => {
                    console.log("Formulario enviado")
                    e.preventDefault()
                    sendMessage()
                  }}
                >
                  <div className="relative flex-1">
                    <Input
                      id="chatbot-input"
                      name="chatbot-message"
                      autoComplete="off"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe tu mensaje..."
                      disabled={loading}
                      className="text-base bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={loading || !input.trim()} 
                    onClick={() => console.log("Botón enviar clickeado")}
                    className="shrink-0 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 z-10 relative"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="relative rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 text-white p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 group overflow-hidden"
        style={{ 
          boxShadow: "0 8px 32px 0 rgba(59,130,246,0.3)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          console.log("Botón flotante clickeado, estado actual:", open)
          setOpen(!open)
        }}
        aria-label={open ? "Cerrar chatbot" : "Abrir chatbot"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        tabIndex={0}
      >
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        
        {/* Icono principal */}
        <MessageCircle className="w-6 h-6 relative z-10" />
        
        {/* Indicador de notificación */}
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
        />
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-300 rounded-full animate-ping" />
          <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse delay-300" />
        </div>
      </motion.button>
    </div>
  )
}

export default ChatbotWidget 
