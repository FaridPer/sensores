// src/components/HumedadChart.jsx
"use client";

import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function HumedadChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = () => {
    fetch("/api/datos")
      .then((res) => res.json())
      .then((data) => {
        const formateado = data.map((item) => ({
          ...item,
          timestamp: new Date(item.fecha).toLocaleTimeString(),
        }));
        setData(formateado.reverse());
      });
  };

  // Ejecutar una vez al montar
  fetchData();

  // Intervalo de 10 segundos
  const intervalId = setInterval(fetchData, 3000);

  // Cleanup al desmontar
  return () => clearInterval(intervalId);
}, []);


  function getEstadoHumedad(valor) {
    if (valor > 900) return { texto: "🌵 Suelo Seco", color: "bg-red-500" };
    if (valor > 500) return { texto: "🌤️ Suelo Moderado", color: "bg-yellow-400" };
    return { texto: "💧 Suelo Húmedo", color: "bg-blue-500" };
  }
  function EstadoVisual({ valor }) {
    const estado = getEstadoHumedad(valor);
  
    return (
      <div className={`estado-humedad ${estado.color}`}>
        <h3>{estado.texto}</h3>
        <p >Lectura actual: {valor} / 1024</p>
      </div>
    );  
  }
  
  return (
    <div className="main-container">
      <div>
        <p>
          Los valores van de 0 a 1024, donde 1024 es completamente seco
        </p>
      </div>
      <div className="graph">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 1024]}  reversed={true} />
            <Tooltip />
            <Line type="monotone" dataKey="humedad" stroke="#38bdf8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {data.length > 0 && (
       <div className="current">
           <EstadoVisual valor={data[data.length - 1].humedad} />
       </div>
       )}
    </div>
  );
}
