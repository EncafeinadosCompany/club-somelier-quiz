"use client"

import { Event } from "@/api/types/events.types"
import { Calendar, Clock, FileText } from "lucide-react"


interface EventCardProps {
  event: Event
  onClick: (event: Event) => void
}

const getCategoryColor = (categoria: string) => {
  const colors = {
    trabajo: "bg-blue-500",
    personal: "bg-green-500",
    reunión: "bg-purple-500",
    familia: "bg-orange-500",
    salud: "bg-red-500",
    educación: "bg-indigo-500",
    deporte: "bg-teal-500",
    viaje: "bg-pink-500",
  }
  return colors[categoria.toLowerCase() as keyof typeof colors] || "bg-gray-500"
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const formatDate = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  const formatTime = (hora: string) => {
    return hora.slice(0, 5) // Remove seconds if present
  }

  return (
    <div
      onClick={() => onClick(event)}
      className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-lg truncate flex-1 mr-2">{event.nombre}</h3>
        <div className={`${getCategoryColor(event.categoria)} px-2 py-1 rounded-full text-xs text-white font-medium`}>
          {event.categoria}
        </div>
      </div>

      <div className="space-y-2 text-white/80 text-sm">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-white/60" />
          <span>{formatDate(event.fecha)}</span>
        </div>

        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-white/60" />
          <span>{formatTime(event.hora)}</span>
        </div>

        {event.descripcion && (
          <div className="flex items-start">
            <FileText className="h-4 w-4 mr-2 text-white/60 mt-0.5" />
            <span className="line-clamp-2">{event.descripcion}</span>
          </div>
        )}
      </div>
    </div>
  )
}
