"use client"

import React from "react"
import { useState } from "react"
import { X, Calendar, Clock, Tag, FileText, User } from "lucide-react"
import { GetCuestion } from "@/api/types/cuestion.type"
import { Textarea } from "@/common/ui/textarea"
import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import { Event } from "@/api/types/events.types"


interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateEvent: (event: Omit<Event, "id">) => void
  selectedCuestion?: GetCuestion | null
}

export default function CreateEventModal({ isOpen, onClose, onCreateEvent, selectedCuestion }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    nombre: selectedCuestion ? `Evento: ${selectedCuestion.title}` : "",
    descripcion: selectedCuestion ? selectedCuestion.description : "",
    categoria: selectedCuestion ? selectedCuestion.categorie : "",
  })

  // Update form when selectedCuestion changes
  React.useEffect(() => {
    if (selectedCuestion) {
      setFormData({
        fecha: "",
        hora: "",
        nombre: `Evento: ${selectedCuestion.title}`,
        descripcion: selectedCuestion.description,
        categoria: selectedCuestion.categorie,
      })
    } else {
      setFormData({
        fecha: "",
        hora: "",
        nombre: "",
        descripcion: "",
        categoria: "",
      })
    }
  }, [selectedCuestion])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nombre && formData.fecha && formData.hora) {
     onCreateEvent(formData)
      setFormData({
        fecha: "",
        hora: "",
        nombre: "",
        descripcion: "",
        categoria: "",
      })
      onClose()
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {selectedCuestion ? "Crear Evento desde Cuestionario" : "Crear Nuevo Evento"}
          </h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedCuestion && (
          <div className="mb-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <p className="text-blue-200 text-sm">
              <strong>Basado en:</strong> {selectedCuestion.title}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <User className="inline h-4 w-4 mr-2" />
              Nombre del Evento
            </label>
            <Input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Ingresa el nombre del evento"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <Calendar className="inline h-4 w-4 mr-2" />
                Fecha
              </label>
              <Input
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange("fecha", e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <Clock className="inline h-4 w-4 mr-2" />
                Hora
              </label>
              <Input
                type="time"
                value={formData.hora}
                onChange={(e) => handleChange("hora", e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <Tag className="inline h-4 w-4 mr-2" />
              Categoría
            </label>
            <Input
              type="text"
              value={formData.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Ej: Trabajo, Personal, Reunión"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <FileText className="inline h-4 w-4 mr-2" />
              Descripción
            </label>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
              placeholder="Describe los detalles del evento"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
              Crear Evento
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
