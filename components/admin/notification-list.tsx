"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Bell, Check, RefreshCw, Filter, X, Calendar } from "lucide-react"
import { formatDistanceToNow, format, subDays, isAfter, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface Notification {
  id: string
  type: string
  recipient: string
  content: string
  data: any
  read: boolean
  created_at: string
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filtros
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [isFiltersActive, setIsFiltersActive] = useState(false)

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100)

      if (error) throw error

      setNotifications(data || [])

      // Extraer tipos únicos de notificaciones para el filtro
      if (data && data.length > 0) {
        const types = [...new Set(data.map((notification) => notification.type))]
        setAvailableTypes(types)
      }

      setError(null)
    } catch (err: any) {
      console.error("Error al cargar notificaciones:", err)
      setError(err.message || "Error al cargar las notificaciones")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()

    // Suscribirse a cambios en la tabla de notificaciones
    const subscription = supabase
      .channel("notifications_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, (payload) => {
        fetchNotifications()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Aplicar filtros cuando cambian o cuando se cargan nuevas notificaciones
  useEffect(() => {
    applyFilters()
  }, [notifications, typeFilter, dateRange])

  const applyFilters = () => {
    let filtered = [...notifications]
    let filtersActive = false

    // Filtrar por tipo
    if (typeFilter !== "all") {
      filtered = filtered.filter((notification) => notification.type === typeFilter)
      filtersActive = true
    }

    // Filtrar por rango de fechas
    if (dateRange.from) {
      filtered = filtered.filter((notification) => {
        const notificationDate = parseISO(notification.created_at)
        return isAfter(notificationDate, dateRange.from as Date)
      })
      filtersActive = true
    }

    if (dateRange.to) {
      filtered = filtered.filter((notification) => {
        const notificationDate = parseISO(notification.created_at)
        return isAfter(dateRange.to as Date, notificationDate)
      })
      filtersActive = true
    }

    setFilteredNotifications(filtered)
    setIsFiltersActive(filtersActive)
  }

  const clearFilters = () => {
    setTypeFilter("all")
    setDateRange({ from: undefined, to: undefined })
    setIsFiltersActive(false)
  }

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id)

      if (error) throw error

      setNotifications((prev) =>
        prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (err: any) {
      console.error("Error al marcar notificación como leída:", err)
    }
  }

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("read", false)

      if (error) throw error

      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    } catch (err: any) {
      console.error("Error al marcar todas las notificaciones como leídas:", err)
    }
  }

  const getPresetDateRange = (days: number) => {
    const to = new Date()
    const from = subDays(to, days)
    setDateRange({ from, to })
    setIsCalendarOpen(false)
  }

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
    }
    if (dateRange.from) {
      return `Desde ${format(dateRange.from, "dd/MM/yyyy")}`
    }
    if (dateRange.to) {
      return `Hasta ${format(dateRange.to, "dd/MM/yyyy")}`
    }
    return "Seleccionar fechas"
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 text-red-300 p-4 rounded-lg">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={fetchNotifications}>
          Reintentar
        </Button>
      </div>
    )
  }

  const displayedNotifications = filteredNotifications.length > 0 ? filteredNotifications : notifications
  const unreadCount = displayedNotifications.filter((notification) => !notification.read).length

  return (
    <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <CardTitle className="text-xl font-semibold text-white">Notificaciones</CardTitle>
          {unreadCount > 0 && <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">{unreadCount} nuevas</Badge>}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-300 border-blue-500/30 hover:bg-blue-900/30"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-1" /> Marcar todas como leídas
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="text-blue-300 border-blue-500/30 hover:bg-blue-900/30"
            onClick={fetchNotifications}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Filtros */}
      <div className="px-6 py-2 border-t border-b border-blue-500/10 bg-blue-900/10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-blue-400" />
            <span className="text-sm text-blue-300">Filtros:</span>
          </div>

          {/* Filtro por tipo */}
          <div className="flex-grow min-w-[150px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 bg-blue-900/30 border-blue-500/20 text-blue-200">
                <SelectValue placeholder="Tipo de notificación" />
              </SelectTrigger>
              <SelectContent className="bg-blue-900/90 border-blue-500/20 text-white">
                <SelectItem value="all">Todos los tipos</SelectItem>
                {availableTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "new_contact" ? "Nueva solicitud de contacto" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por fecha */}
          <div className="flex-grow min-w-[200px]">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal h-8 bg-blue-900/30 border-blue-500/20 text-blue-200 ${dateRange.from || dateRange.to ? "text-blue-100" : "text-blue-300/70"}`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-blue-900/90 border-blue-500/20" align="start">
                <div className="p-3 border-b border-blue-500/20">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-blue-200">Rango de fechas</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-blue-300 hover:text-blue-200"
                      onClick={() => setDateRange({ from: undefined, to: undefined })}
                    >
                      <X className="h-3 w-3 mr-1" /> Limpiar
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-blue-500/20 text-blue-300"
                      onClick={() => getPresetDateRange(7)}
                    >
                      7 días
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-blue-500/20 text-blue-300"
                      onClick={() => getPresetDateRange(30)}
                    >
                      30 días
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-blue-500/20 text-blue-300"
                      onClick={() => getPresetDateRange(90)}
                    >
                      90 días
                    </Button>
                  </div>
                </div>
                <CalendarComponent
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    setDateRange(range || { from: undefined, to: undefined })
                    if (range?.to) {
                      setIsCalendarOpen(false)
                    }
                  }}
                  className="bg-blue-900/90 text-blue-100"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Botón para limpiar filtros */}
          {isFiltersActive && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30 h-8"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1" /> Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <CardContent className="pt-4">
        {displayedNotifications.length === 0 ? (
          <div className="text-center py-8 text-blue-200/70">
            <Bell className="h-12 w-12 mx-auto mb-3 text-blue-500/40" />
            <p>No hay notificaciones{isFiltersActive ? " con los filtros seleccionados" : ""}</p>
            {isFiltersActive && (
              <Button variant="link" className="text-blue-400 hover:text-blue-300 mt-2" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {displayedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read ? "bg-blue-900/20 border-blue-500/10" : "bg-blue-900/30 border-blue-500/30"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <Bell className={`h-4 w-4 mr-2 ${notification.read ? "text-blue-400/60" : "text-blue-400"}`} />
                      <h4 className={`font-medium ${notification.read ? "text-blue-200/70" : "text-white"}`}>
                        {notification.type === "new_contact" ? "Nueva solicitud de contacto" : notification.type}
                      </h4>
                    </div>
                    <p className={`mt-1 ${notification.read ? "text-blue-200/50" : "text-blue-200/70"}`}>
                      {notification.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-blue-200/50">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>
                    <span className="text-xs text-blue-200/40 mt-1">
                      {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm")}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30 mt-2 h-8 px-2"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3 w-3 mr-1" /> Marcar como leída
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
