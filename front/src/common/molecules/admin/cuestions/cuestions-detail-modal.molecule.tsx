"use client"

import { GetCuestion } from "@/api/types/cuestion.type"
import { Button } from "@/common/ui/button"
import { X, FileText, Tag, Plus } from "lucide-react"


interface CuestionDetailModalProps {
  cuestion: GetCuestion | null
  isOpen: boolean
  onClose: () => void
  onCreateEvent: (cuestion: GetCuestion) => void
}

export default function CuestionDetailModal({ cuestion, isOpen, onClose, onCreateEvent }: CuestionDetailModalProps) {
  if (!isOpen || !cuestion) return null

  const getCategoryColor = (categorie: string) => {
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
    return colors[categorie.toLowerCase() as keyof typeof colors] || "bg-gray-500"
  }

  const handleCreateEvent = () => {
    onCreateEvent(cuestion)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white pr-4">{cuestion.title}</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-center">
            <Tag className="h-5 w-5 mr-3 text-white/60" />
            <span className={`${getCategoryColor(cuestion.categorie)} px-4 py-2 rounded-full text-white font-medium`}>
              {cuestion.categorie}
            </span>
          </div>

          <div className="flex items-start">
            <FileText className="h-5 w-5 mr-3 text-white/60 mt-1" />
            <div className="text-white">
              <p className="font-medium mb-2">Descripción:</p>
              <p className="text-white/80 leading-relaxed">{cuestion.description}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
            variant="outline"
          >
            Cerrar
          </Button>
          <Button onClick={handleCreateEvent} className="bg-blue-500 hover:bg-blue-600 text-white px-6">
            <Plus className="h-4 w-4 mr-2" />
            Crear Evento
          </Button>
        </div>
      </div>
    </div>
  )
}
