// src/app/api/datos/route.js
import { cors } from "./cors";

export async function POST(request) {
  const headers = cors(request);  // Obtiene los encabezados CORS

  const auth = request.headers.get("authorization");

  if (auth !== "Bearer LOREIPSUM443$F") {
    return new Response(JSON.stringify({ message: "No autorizado" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        ...headers  // Añade los encabezados CORS
      }
    });
  }

  const body = await request.json();
  const { humedad } = body;

  console.log("📡 Humedad recibida:", humedad);

  return new Response(JSON.stringify({ message: "Datos recibidos correctamente" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...headers  // Añade los encabezados CORS
    }
  });
}
