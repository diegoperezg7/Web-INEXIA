"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Verificar si el usuario es administrador
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .single()

      if (adminError || !adminData) {
        await supabase.auth.signOut()
        throw new Error("No tienes permisos de administrador")
      }

      router.push("/admin/dashboard")
    } catch (err: any) {
      console.error("Error de autenticación:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Panel de Administración</h2>

      {error && <div className="bg-red-900/20 text-red-300 p-3 rounded-lg text-sm mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-blue-200/70">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@neurax.ai"
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-blue-200/70">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>
    </div>
  )
}
