"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { ContactList } from "@/components/admin/contact-list"
import { NotificationList } from "@/components/admin/notification-list"
import { Loader2, LogOut } from "lucide-react"

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          router.push("/admin")
          return
        }

        // Verificar si es administrador
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", session.user.email)
          .single()

        if (adminError || !adminData) {
          await supabase.auth.signOut()
          router.push("/admin")
          return
        }

        setUser(adminData)
      } catch (err) {
        console.error("Error de autenticación:", err)
        router.push("/admin")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-blue-900/20 backdrop-blur-lg border-b border-blue-500/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            NeuraX <span className="text-blue-400">Admin</span>
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-blue-200/70">{user?.name || user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Panel de administración</h2>

        <div className="space-y-8">
          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ContactList />
            </div>
            <div>
              <NotificationList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
