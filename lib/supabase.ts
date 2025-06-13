import { createClient } from "@supabase/supabase-js"

// Crear un cliente de Supabase para el lado del cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Verificar que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Faltan variables de entorno de Supabase")
}

// Crear el cliente con opciones básicas
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
