import "@/styles/globals.css"
import { Rajdhani, Audiowide } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type React from "react"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>NeuraX - Automatización con IA para empresas ágiles</title>
        <meta
          name="description"
          content="Agencia de inteligencia artificial y automatización no-code para empresas ágiles. Automatiza tu empresa con IA en días, no en meses."
        />
      </head>
      <body className={`${rajdhani.variable} ${audiowide.variable} ${rajdhani.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableSystemTheme>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
