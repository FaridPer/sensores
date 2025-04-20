// src/app/api/datos/route.js
import pool from "@/lib/db";
import { cors } from "./cors";

export async function POST(request) {
  const headers = cors(request);
  const auth = request.headers.get("authorization");

  if (auth !== "Bearer LOREIPSUM443$F") {
    return new Response(JSON.stringify({ message: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...headers }
    });
  }

  const body = await request.json();
  const { humedad } = body;

  console.log("📡 Humedad recibida:", humedad);

  try {
    await pool.query(
      `INSERT INTO lecturas (humedad) VALUES ($1)`,
      [humedad]
    );

    return new Response(JSON.stringify({ message: "Datos guardados" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...headers }
    });

  } catch (err) {
    console.error("❌ Error al insertar en DB:", err);
    return new Response(JSON.stringify({ message: "Error de servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...headers }
    });
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, humedad, fecha FROM lecturas ORDER BY fecha DESC LIMIT 20"
    );

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error al obtener datos:", err);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}