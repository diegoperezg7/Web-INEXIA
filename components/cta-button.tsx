"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface CtaButtonProps {
  text: string
  className?: string
}

export function CtaButton({ text, className = "" }: CtaButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    // Desplazar a la sección de contacto
    const element = document.getElementById("cta")
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }

    // Registrar el clic en el botón CTA
    try {
      setIsLoading(true)
      await supabase.from("cta_clicks").insert([
        {
          button_text: text,
          page_location: window.location.pathname,
          referrer: document.referrer || "direct",
        },
      ])
    } catch (error) {
      console.error("Error al registrar clic en CTA:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden group ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <span className="relative z-10">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
            Cargando...
          </>
        ) : (
          text
        )}
      </span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
    </Button>
  )
}
