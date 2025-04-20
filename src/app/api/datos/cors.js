// src/middleware/cors.js
export function cors(req) {
    const headers = {
      "Access-Control-Allow-Origin": "*", // Permite acceso desde cualquier dominio, puedes restringirlo a dominios específicos.
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Métodos permitidos
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Cabeceras permitidas
    };
  
    if (req.method === "OPTIONS") {
      // Si la petición es de tipo OPTIONS (pre-flight request), simplemente responde con un status 204.
      return new Response(null, { headers, status: 204 });
    }
  
    return headers;
  }
  