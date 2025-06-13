"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, Clock, CheckCircle, XCircle } from "lucide-react"

interface Stats {
  total: number
  pending: number
  contacted: number
  interested: number
  closed: number
  rejected: number
  lastWeek: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    contacted: 0,
    interested: 0,
    closed: 0,
    rejected: 0,
    lastWeek: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener total de contactos
        const { count: total, error: totalError } = await supabase
          .from("contact_requests")
          .select("*", { count: "exact", head: true })

        if (totalError) throw totalError

        // Obtener contactos por estado
        const { data: statusData, error: statusError } = await supabase.from("contact_requests").select("status")

        if (statusError) throw statusError

        // Obtener contactos de la última semana
        const lastWeekDate = new Date()
        lastWeekDate.setDate(lastWeekDate.getDate() - 7)

        const { count: lastWeek, error: lastWeekError } = await supabase
          .from("contact_requests")
          .select("*", { count: "exact", head: true })
          .gte("created_at", lastWeekDate.toISOString())

        if (lastWeekError) throw lastWeekError

        // Calcular estadísticas por estado
        const statusCounts = {
          pending: 0,
          contacted: 0,
          interested: 0,
          closed: 0,
          rejected: 0,
        }

        statusData.forEach((item) => {
          const status = item.status || "pending"
          if (status in statusCounts) {
            statusCounts[status as keyof typeof statusCounts]++
          }
        })

        setStats({
          total: total || 0,
          ...statusCounts,
          lastWeek: lastWeek || 0,
        })
      } catch (err) {
        console.error("Error al cargar estadísticas:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-200/70">Total solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-6 w-6 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-xs text-blue-200/50 mt-1">{stats.lastWeek} nuevas esta semana</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-yellow-200/70">Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-white">{stats.pending}</span>
          </div>
          <p className="text-xs text-blue-200/50 mt-1">{((stats.pending / stats.total) * 100).toFixed(1)}% del total</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-200/70">Interesados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-2xl font-bold text-white">{stats.interested}</span>
          </div>
          <p className="text-xs text-blue-200/50 mt-1">
            {((stats.interested / stats.total) * 100).toFixed(1)}% del total
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-200/70">Cerrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <XCircle className="h-6 w-6 text-purple-400 mr-2" />
            <span className="text-2xl font-bold text-white">{stats.closed}</span>
          </div>
          <p className="text-xs text-blue-200/50 mt-1">{((stats.closed / stats.total) * 100).toFixed(1)}% del total</p>
        </CardContent>
      </Card>
    </div>
  )
}
