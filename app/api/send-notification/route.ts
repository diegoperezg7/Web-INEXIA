import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Simulamos el procesamiento de la notificación
    console.log("Notificación recibida:", body)

    // Simulamos un retraso para hacer más realista la respuesta
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Devolvemos una respuesta exitosa
    return NextResponse.json({ success: true, message: "Notificación enviada correctamente" })
  } catch (error) {
    console.error("Error al procesar la notificación:", error)
    return NextResponse.json({ error: "Error al procesar la notificación" }, { status: 500 })
  }
}
