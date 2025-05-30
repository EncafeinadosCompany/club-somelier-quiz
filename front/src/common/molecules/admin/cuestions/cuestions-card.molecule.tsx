"use client"

import { Cuestion } from "@/api/types/cuestion.type"
import { Button } from "@/common/ui/button"
import { FileText, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"


interface CuestionCardProps {
  cuestion: Cuestion
  onCreateEvent: (cuestion: Cuestion) => void
  onViewDetails: (cuestion: Cuestion) => void
}


 
export default function CuestionCard({ cuestion, onCreateEvent, onViewDetails }: CuestionCardProps) {

  const navigate = useNavigate()

   const handleClick = () => {
    navigate(`/admin/detailsCuestions?id=${cuestion.id}`)
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 sm:p-6 transition-all duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-lg flex flex-col h-full min-h-[280px] max-w-full">
      {/* Header with title and category */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <h3
          className="text-white font-semibold text-base sm:text-lg leading-tight cursor-pointer hover:text-blue-200 transition-colors flex-1 min-w-0 break-words"
          // onClick={() => onViewDetails(cuestion)}
        >
          {cuestion.title} 
        </h3>
        {/* <div
          className={`${getCategoryColor(cuestion.categorie)} px-2 py-1 rounded-full text-xs text-white font-medium self-start sm:self-auto whitespace-nowrap flex-shrink-0`}
        >
          {cuestion.categorie}
        </div> */}
      </div>

      {/* Description */}
      <div className="flex-1 mb-4">
        <div className="flex items-start">
          <FileText className="h-4 w-4 mr-2 text-white/60 mt-1 flex-shrink-0" />
          <p className="text-white/80 text-sm leading-relaxed line-clamp-4 break-words">{cuestion.description}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
        <Button
          onClick={() => handleClick()}
          variant="outline"
          className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs sm:text-sm py-2 px-3 min-w-0"
        >
          <span className="truncate">Ver Detalles</span>
        </Button>
        <Button
          onClick={() => onCreateEvent(cuestion)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm py-2 px-3 min-w-0"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Crear Evento</span>
        </Button>
      </div>
    </div>
  )
}
