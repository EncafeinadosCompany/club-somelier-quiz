"use client"

import { Event } from "@/api/types/events.types"
import { Button } from "@/common/ui/button"
import { X, Calendar, Clock, Tag, FileText, Trash2 } from "lucide-react"


interface EventDetailModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onDelete: (id: number) => void
}

export default function EventDetailModal({ event, isOpen, onClose, onDelete }: EventDetailModalProps) {
  if (!isOpen || !event) return null

  const formatDate = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (hora: string) => {
    return hora.slice(0, 5)
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
    return (colors as Record<string, string>)[categoria.toLowerCase()] || "bg-gray-500"
  }

  const handleDelete = () => {
    onDelete(event.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{event.nombre}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-3 text-white/60" />
            <span className="text-white text-lg">{formatDate(event.fecha)}</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-3 text-white/60" />
            <span className="text-white text-lg">{formatTime(event.hora)}</span>
          </div>

          <div className="flex items-center">
            <Tag className="h-5 w-5 mr-3 text-white/60" />
            <span className={`${getCategoryColor(event.categoria)} px-3 py-1 rounded-full text-white font-medium`}>
              {event.categoria}
            </span>
          </div>

          {event.descripcion && (
            <div className="flex items-start">
              <FileText className="h-5 w-5 mr-3 text-white/60 mt-1" />
              <div className="text-white">
                <p className="font-medium mb-1">Descripción:</p>
                <p className="text-white/80 leading-relaxed">{event.descripcion}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
            variant="outline"
          >
            Cerrar
          </Button>
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-4" variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}
