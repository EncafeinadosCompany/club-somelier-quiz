"use client"

import { useState } from "react"
import { X, Calendar, Clock, FileText, Trash2 } from "lucide-react"
import { Event } from "@/api/types/events.types"
import { Button } from "@/common/ui/button"


interface EventsListModalProps {
  isOpen: boolean
  onClose: () => void
  events: Event[]
  onDeleteEvent: (id: number) => void
}

export default function EventsListModal({ isOpen, onClose, events, onDeleteEvent }: EventsListModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  if (!isOpen) return null

  const formatDate = (fecha: string) => {
    const date = new Date(fecha)
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (hora: string) => {
    return hora.slice(0, 5)
  }

  const getCategoryColor = (categoria: string) => {
    const colors = {
      trabajo: "bg-blue-500",
      personal: "bg-green-500",
      educación: "bg-purple-500",
      salud: "bg-red-500",
      tecnología: "bg-indigo-500",
      deporte: "bg-teal-500",
      entretenimiento: "bg-pink-500",
      finanzas: "bg-orange-500",
    }
    return (colors as Record<string, string>)[categoria.toLowerCase()] || "bg-gray-500"
  }

  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.fecha} ${a.hora}`)
    const dateB = new Date(`${b.fecha} ${b.hora}`)
    return dateA.getTime() - dateB.getTime()
  })

  if (selectedEvent) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-lg w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{selectedEvent.nombre}</h2>
            <button onClick={() => setSelectedEvent(null)} className="text-white/70 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-white/60" />
              <span className="text-white text-lg">{formatDate(selectedEvent.fecha)}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-white/60" />
              <span className="text-white text-lg">{formatTime(selectedEvent.hora)}</span>
            </div>

            {selectedEvent.categoria && (
              <div className="flex items-center">
                <span
                  className={`${getCategoryColor(selectedEvent.categoria)} px-3 py-1 rounded-full text-white font-medium`}
                >
                  {selectedEvent.categoria}
                </span>
              </div>
            )}

            {selectedEvent.descripcion && (
              <div className="flex items-start">
                <FileText className="h-5 w-5 mr-3 text-white/60 mt-1" />
                <div className="text-white">
                  <p className="font-medium mb-1">Descripción:</p>
                  <p className="text-white/80 leading-relaxed">{selectedEvent.descripcion}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setSelectedEvent(null)}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              Volver
            </Button>
            <Button
              onClick={() => {
                onDeleteEvent(selectedEvent.id)
                setSelectedEvent(null)
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4"
              variant="destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-4xl w-full p-6 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Mis Eventos Creados ({events.length})</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-16 w-16 text-white/30 mb-4" />
            <p className="text-white/60 text-lg mb-2">No tienes eventos creados</p>
            <p className="text-white/40 text-sm">Los eventos que crees desde los cuestionarios aparecerán aquí</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto max-h-[50vh]">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-3 sm:p-4 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-105"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                  <h3 className="text-white font-semibold text-sm sm:text-lg leading-tight flex-1 min-w-0 break-words">
                    {event.nombre}
                  </h3>
                  {event.categoria && (
                    <div
                      className={`${getCategoryColor(event.categoria)} px-2 py-1 rounded-full text-xs text-white font-medium self-start flex-shrink-0`}
                    >
                      {event.categoria}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-white/60 flex-shrink-0" />
                    <span className="truncate">{formatDate(event.fecha)}</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-white/60 flex-shrink-0" />
                    <span className="truncate">{formatTime(event.hora)}</span>
                  </div>

                  {event.descripcion && (
                    <div className="flex items-start">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-white/60 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2 break-words">{event.descripcion}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            variant="outline"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
