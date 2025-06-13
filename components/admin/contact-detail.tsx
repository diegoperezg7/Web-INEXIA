"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft, Send, Phone, Mail, Building, Tag } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"

interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  company_sector: string
  message: string
  status: string
  created_at: string
  notes: string
  assigned_to: string
  last_contact: string
}

interface Activity {
  id: string
  contact_id: string
  activity_type: string
  description: string
  created_at: string
  created_by: string
}

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  contacted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  interested: "bg-green-500/20 text-green-300 border-green-500/30",
  closed: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
}

export function ContactDetail() {
  const params = useParams()
  const router = useRouter()
  const [contact, setContact] = useState<Contact | null>(null)
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchContactData = async () => {
      if (!params.id) return

      try {
        // Obtener datos del contacto
        const { data: contactData, error: contactError } = await supabase
          .from("contact_requests")
          .select("*")
          .eq("id", params.id)
          .single()

        if (contactError) throw contactError

        setContact(contactData)

        // Obtener actividades
        const { data: activityData, error: activityError } = await supabase
          .from("contact_activities")
          .select("*")
          .eq("contact_id", params.id)
          .order("created_at", { ascending: false })

        if (activityError) throw activityError

        setActivities(activityData || [])
      } catch (err: any) {
        console.error("Error al cargar datos:", err)
        setError(err.message || "Error al cargar los datos")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContactData()

    // Suscribirse a cambios
    const subscription = supabase
      .channel(`contact_${params.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_activities", filter: `contact_id=eq.${params.id}` },
        (payload) => {
          // Actualizar actividades
          fetchContactData()
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_requests", filter: `id=eq.${params.id}` },
        (payload) => {
          // Actualizar datos del contacto
          fetchContactData()
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [params.id])

  const updateStatus = async (status: string) => {
    if (!contact) return

    try {
      const { error } = await supabase
        .from("contact_requests")
        .update({ status, last_contact: new Date().toISOString() })
        .eq("id", contact.id)

      if (error) throw error

      // Registrar actividad
      await supabase.from("contact_activities").insert([
        {
          contact_id: contact.id,
          activity_type: "status_change",
          description: `Estado actualizado a: ${status}`,
        },
      ])

      setContact({ ...contact, status })
    } catch (err: any) {
      console.error("Error al actualizar estado:", err)
    }
  }

  const addNote = async () => {
    if (!contact || !newNote.trim()) return

    setIsSubmitting(true)

    try {
      // Actualizar notas en el contacto
      const updatedNotes = contact.notes
        ? `${contact.notes}\n\n${format(new Date(), "dd/MM/yyyy HH:mm")}: ${newNote}`
        : `${format(new Date(), "dd/MM/yyyy HH:mm")}: ${newNote}`

      const { error: updateError } = await supabase
        .from("contact_requests")
        .update({
          notes: updatedNotes,
          last_contact: new Date().toISOString(),
        })
        .eq("id", contact.id)

      if (updateError) throw updateError

      // Registrar actividad
      const { error: activityError } = await supabase.from("contact_activities").insert([
        {
          contact_id: contact.id,
          activity_type: "note",
          description: newNote,
        },
      ])

      if (activityError) throw activityError

      setContact({ ...contact, notes: updatedNotes })
      setNewNote("")
    } catch (err: any) {
      console.error("Error al añadir nota:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error || !contact) {
    return (
      <div className="bg-red-900/20 text-red-300 p-4 rounded-lg">
        <p>Error: {error || "No se encontró el contacto"}</p>
        <Button variant="outline" className="mt-2" onClick={() => router.push("/admin/dashboard")}>
          Volver al panel
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-blue-300 hover:text-blue-200 hover:bg-blue-900/30"
          onClick={() => router.push("/admin/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>

        <Select value={contact.status} onValueChange={updateStatus}>
          <SelectTrigger
            className={`w-[180px] ${STATUS_COLORS[contact.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.pending}`}
          >
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-blue-900/90 border-blue-500/20 text-white">
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="contacted">Contactado</SelectItem>
            <SelectItem value="interested">Interesado</SelectItem>
            <SelectItem value="closed">Cerrado</SelectItem>
            <SelectItem value="rejected">Rechazado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                {contact.name}
                <Badge
                  variant="outline"
                  className={`${STATUS_COLORS[contact.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.pending} capitalize`}
                >
                  {contact.status || "pendiente"}
                </Badge>
              </CardTitle>
              <CardDescription className="text-blue-200/70">
                Solicitud recibida{" "}
                {formatDistanceToNow(new Date(contact.created_at), {
                  addSuffix: true,
                  locale: es,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-blue-200/70">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${contact.email}`} className="hover:text-blue-300">
                  {contact.email}
                </a>
              </div>

              {contact.phone && (
                <div className="flex items-center text-blue-200/70">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${contact.phone}`} className="hover:text-blue-300">
                    {contact.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center text-blue-200/70">
                <Building className="h-4 w-4 mr-2" />
                <span>{contact.company}</span>
              </div>

              {contact.company_sector && (
                <div className="flex items-center text-blue-200/70">
                  <Tag className="h-4 w-4 mr-2" />
                  <span className="capitalize">{contact.company_sector}</span>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-2">Mensaje</h3>
                <div className="bg-blue-900/30 p-4 rounded-lg text-blue-100/90 whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Historial de actividad</CardTitle>
              <CardDescription className="text-blue-200/70">Registro de todas las interacciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-blue-200/70 text-center py-4">No hay actividades registradas</p>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500/50">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-blue-300 capitalize">
                          {activity.activity_type.replace("_", " ")}
                        </span>
                        <span className="text-xs text-blue-200/50">
                          {formatDistanceToNow(new Date(activity.created_at), {
                            addSuffix: true,
                            locale: es,
                          })}
                        </span>
                      </div>
                      <p className="mt-2 text-blue-100/90">{activity.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Notas</CardTitle>
              <CardDescription className="text-blue-200/70">Añade notas sobre este contacto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Añade una nota..."
                  className="bg-blue-900/20 border-blue-500/20 text-white placeholder:text-blue-200/50 focus-visible:ring-blue-500 min-h-[100px]"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={addNote}
                  disabled={isSubmitting || !newNote.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Añadir nota
                    </>
                  )}
                </Button>
              </div>

              {contact.notes && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">Notas anteriores</h4>
                  <div className="bg-blue-900/30 p-4 rounded-lg text-blue-100/90 whitespace-pre-wrap text-sm max-h-[300px] overflow-y-auto">
                    {contact.notes}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-blue-500/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
                onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
              >
                <Mail className="mr-2 h-4 w-4" /> Enviar email
              </Button>

              {contact.phone && (
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-500/20 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
                  onClick={() => window.open(`tel:${contact.phone}`, "_blank")}
                >
                  <Phone className="mr-2 h-4 w-4" /> Llamar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
