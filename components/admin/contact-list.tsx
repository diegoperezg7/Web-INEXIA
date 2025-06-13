"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader2, MoreHorizontal, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  company_sector: string
  status: string
  created_at: string
}

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  contacted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  interested: "bg-green-500/20 text-green-300 border-green-500/30",
  closed: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from("contact_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        setContacts(data || [])
      } catch (err: any) {
        console.error("Error al cargar contactos:", err)
        setError(err.message || "Error al cargar los datos")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacts()

    // Suscribirse a cambios en la tabla
    const subscription = supabase
      .channel("contact_requests_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "contact_requests" }, (payload) => {
        fetchContacts()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from("contact_requests").update({ status }).eq("id", id)

      if (error) throw error

      // Registrar actividad
      await supabase.from("contact_activities").insert([
        {
          contact_id: id,
          activity_type: "status_change",
          description: `Estado actualizado a: ${status}`,
        },
      ])

      setContacts((prev) => prev.map((contact) => (contact.id === id ? { ...contact, status } : contact)))
    } catch (err: any) {
      console.error("Error al actualizar estado:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 text-red-300 p-4 rounded-lg">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 backdrop-blur-sm rounded-xl border border-blue-500/20 p-4 overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-white">Solicitudes de contacto</h2>

      {contacts.length === 0 ? (
        <p className="text-blue-200/70 text-center py-8">No hay solicitudes de contacto</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-blue-900/30">
                <TableHead className="text-blue-200/70">Nombre</TableHead>
                <TableHead className="text-blue-200/70">Empresa</TableHead>
                <TableHead className="text-blue-200/70">Sector</TableHead>
                <TableHead className="text-blue-200/70">Estado</TableHead>
                <TableHead className="text-blue-200/70">Fecha</TableHead>
                <TableHead className="text-blue-200/70 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-blue-900/30 border-blue-500/10">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{contact.name}</p>
                      <p className="text-sm text-blue-200/70">{contact.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white">{contact.company}</p>
                      {contact.phone && <p className="text-sm text-blue-200/70">{contact.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-white capitalize">{contact.company_sector || "No especificado"}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${STATUS_COLORS[contact.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.pending} capitalize`}
                    >
                      {contact.status || "pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-blue-200/70">
                      {formatDistanceToNow(new Date(contact.created_at), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-blue-300 hover:text-blue-200">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-blue-900/90 border-blue-500/20 text-white">
                        <DropdownMenuItem
                          className="hover:bg-blue-800/50 cursor-pointer"
                          onClick={() => (window.location.href = `/admin/contacts/${contact.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-blue-800/50 cursor-pointer"
                          onClick={() => updateStatus(contact.id, "contacted")}
                        >
                          Marcar como contactado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-blue-800/50 cursor-pointer"
                          onClick={() => updateStatus(contact.id, "interested")}
                        >
                          Marcar como interesado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-blue-800/50 cursor-pointer"
                          onClick={() => updateStatus(contact.id, "closed")}
                        >
                          Marcar como cerrado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-blue-800/50 cursor-pointer"
                          onClick={() => updateStatus(contact.id, "rejected")}
                        >
                          Marcar como rechazado
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
