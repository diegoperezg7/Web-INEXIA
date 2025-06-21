import "@/styles/globals.css"
import { Rajdhani, Audiowide } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import ChatbotWidget from "@/components/chatbot-widget"

// Tipografía principal futurista con buena legibilidad
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
})

// Tipografía para títulos ultra futurista
const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-audiowide",
})

export const metadata = {
  title: "NeuraX - Agencia de Inteligencia Artificial",
  description: "Agencia de inteligencia artificial y automatización no-code para empresas ágiles. Automatiza tu empresa con IA en días, no en meses.",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${rajdhani.variable} ${audiowide.variable} ${rajdhani.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  )
}

