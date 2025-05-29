"use client"

import { useState, useEffect, useMemo } from "react"

import { Search, Settings, Menu, FileQuestion, Filter, X, Calendar, Plus } from "lucide-react"
import { GetCuestion } from "@/api/types/cuestion.type"
import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import CuestionCard from "@/common/molecules/admin/cuestions/cuestions-card.molecule"
import CreateEventModal from "@/common/molecules/admin/event/create-event-modal.molecule"
import CuestionDetailModal from "@/common/molecules/admin/cuestions/cuestions-detail-modal.molecule"
import EventsListModal from "@/common/molecules/admin/event/events-list-modal.molecule"
import { Event } from "@/api/types/events.types"
import { Getquestions, question } from "@/api/types/questions.type"
import QuestionsListModal from "@/common/widgets/admin/questions.widget"
import CreateQuestionModal from "@/common/molecules/admin/Questions/create-question-modal.molecule"


export default function HomeCuestion() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cuestions, setCuestions] = useState<GetCuestion[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)
  const [isEventsListModalOpen, setIsEventsListModalOpen] = useState(false)
  const [selectedCuestion, setSelectedCuestion] = useState<GetCuestion | null>(null)
  const [selectedCuestionForEvent, setSelectedCuestionForEvent] = useState<GetCuestion | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  //QUESTION MODAL
  const [isQuestionsListModalOpen, setQuestionsListModalOpen] = useState(false)
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] = useState(false)

  useEffect(() => {
    // Aseguramos que isLoaded se establezca a true
    setIsLoaded(true)

    // Sample cuestions
    const sampleCuestions: GetCuestion[] = [
      {
        id: 1,
        title: "Evaluación de Desempeño Laboral",
        categorie: "trabajo",
        description:
          "Cuestionario completo para evaluar el rendimiento de los empleados durante el último trimestre. Incluye métricas de productividad, trabajo en equipo y cumplimiento de objetivos.",
      },
      {
        id: 2,
        title: "Encuesta de Satisfacción del Cliente",
        categorie: "trabajo",
        description:
          "Formulario para medir la satisfacción de nuestros clientes con los productos y servicios ofrecidos. Ayuda a identificar áreas de mejora.",
      },
      {
        id: 3,
        title: "Cuestionario de Salud Mental",
        categorie: "salud",
        description:
          "Evaluación psicológica básica para detectar signos de estrés, ansiedad o depresión. Recomendado para uso profesional.",
      },
      {
        id: 4,
        title: "Test de Conocimientos en JavaScript",
        categorie: "tecnología",
        description:
          "Examen técnico para evaluar conocimientos en JavaScript, incluyendo ES6+, async/await, y conceptos avanzados de programación.",
      },
      {
        id: 5,
        title: "Evaluación de Hábitos Alimenticios",
        categorie: "salud",
        description:
          "Cuestionario nutricional para analizar patrones de alimentación y proporcionar recomendaciones personalizadas de dieta.",
      },
      {
        id: 6,
        title: "Encuesta de Clima Organizacional",
        categorie: "trabajo",
        description:
          "Medición del ambiente laboral, comunicación interna, liderazgo y satisfacción general de los empleados en la organización.",
      },
      {
        id: 7,
        title: "Test de Personalidad MBTI",
        categorie: "personal",
        description:
          "Cuestionario basado en el indicador Myers-Briggs para identificar tipos de personalidad y preferencias en el comportamiento.",
      },
      {
        id: 8,
        title: "Evaluación de Riesgo Financiero",
        categorie: "finanzas",
        description:
          "Análisis del perfil de riesgo del inversor para recomendar productos financieros adecuados según su tolerancia al riesgo.",
      },
    ]

    // Establecemos los cuestionarios con un pequeño retraso para asegurar que el DOM esté listo
    setTimeout(() => {
      setCuestions(sampleCuestions)
    }, 100)
  }, [])



  const handleCreateEventFromCuestion = (cuestion: GetCuestion) => {
    setSelectedCuestionForEvent(cuestion)
    setIsCreateEventModalOpen(true)
  }

  const handleCreateEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now(), // Simple ID generation
    }
    setEvents((prev) => [...prev, newEvent])
    setSelectedCuestionForEvent(null)
  }

  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }




  const filteredCuestions = useMemo(() => {
    return cuestions.filter((cuestion) => {
      const matchesSearch =
        cuestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuestion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuestion.categorie.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [cuestions, searchTerm])


  console.log('events', filteredCuestions)

  const clearFilters = () => {
    setSearchTerm("")
  }


  console.log(isCreateQuestionModalOpen)
  const hasActiveFilters = searchTerm

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"

        className="object-cover absolute h-full w-full"

      />

      {/* Navigation */}
      <header
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6 opacity-100 ${isLoaded ? "animate-fade-in" : ""}`}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
          <span className="text-2xl font-semibold text-white drop-shadow-lg">Gestor de Cuestionarios</span>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={() => setIsEventsListModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Ver Eventos ({events.length})
          </Button>
          <Settings className="h-6 w-6 text-white drop-shadow-md cursor-pointer" />
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">
            U
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative h-screen w-full pt-20 flex">
        {/* Sidebar */}
        <div
          className={`w-80 h-full bg-white/10 backdrop-blur-lg p-6 shadow-xl border-r border-white/20 rounded-tr-3xl opacity-100 ${isLoaded ? "animate-fade-in" : ""} flex flex-col`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="mb-6">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filtros
            </h3>

            {/* Search Filter */}
            <div className="mb-4">
              <label className="block text-white/80 text-sm font-medium mb-2">Buscar cuestionarios</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                <Input
                  type="text"
                  placeholder="Buscar por título, categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <X className="h-4 w-4 mr-2" />
                Limpiar Filtros
              </Button>
            )}
          </div>

          <div className="space-y-5 overflow-y-auto">
            {/* Stats */}
            <div className="bg-white/10   rounded-xl p-4 border border-white/20 mb-6">
              <h4 className="text-white font-medium mb-3">Estadísticas</h4>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex justify-between">
                  <span>Total cuestionarios:</span>
                  <span className="font-medium text-white">{cuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cuestionarios filtrados:</span>
                  <span className="font-medium text-white">{filteredCuestions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eventos creados:</span>
                  <span className="font-medium text-white">{events.length}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <div className="flex justify-between">
                <h4 className="text-white font-medium mb-3">Categorías</h4>
                <Button
                  size="icon"
                  className="w-6 h-6 bg-amber-200 hover:bg-amber-300 rounded-full p-1"
                  variant="ghost"
                >
                  <Plus className="h-1 w-1" />
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                {Array.from(new Set(cuestions.map((c) => c.categorie))).map((category) => (
                  <div key={category} className="flex justify-between text-white/80">
                    <span className="capitalize">{category}</span>
                    <span>{cuestions.filter((c) => c.categorie === category).length}</span>
                  </div>
                ))}
              </div>
            </div>


            {/* Cuestion */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
              <h4 className="text-white font-medium mb-3">Preguntas</h4>
              <div className="space-y-2 flex flex-col  text-sm">
                <Button  onClick={()=> setIsCreateQuestionModalOpen(true)} className="relative">
                  <FileQuestion className="absolute left-3 h-6 w-6 mr-3" />
                  Crear nueva pregunta
                </Button>
                <Button  onClick={() => setQuestionsListModalOpen(true)} className="relative">
                  <FileQuestion className="absolute left-3 h-6 w-6 mr-3" />
                  Ver todas las preguntas 
                </Button>

              </div>
            </div>
          </div>
        </div>

        {/* Cuestions List */}
        <div
          className={`flex-1 flex flex-col opacity-100 ${isLoaded ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FileQuestion className="h-6 w-6 mr-3" />
                Cuestionarios Disponibles
                {hasActiveFilters && (
                  <span className="ml-3 text-sm bg-blue-500 px-2 py-1 rounded-full">
                    {filteredCuestions.length} resultados
                  </span>
                )}
              </h2>
            </div>

            {/* Cuestions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-auto scrollbar-thumb pr-2">
              {filteredCuestions.length > 0 ? (
                filteredCuestions.map((cuestion) => {

                  console.log('cuestion', cuestion)
                  return (

                    <CuestionCard
                      key={cuestion.id}
                      cuestion={cuestion}
                      onCreateEvent={handleCreateEventFromCuestion}
                      onViewDetails={setSelectedCuestion}
                    />
                  )
                }
                )
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <FileQuestion className="h-16 w-16 text-white/30 mb-4" />
                  <p className="text-white/60 text-lg mb-2">
                    {hasActiveFilters ? "No se encontraron cuestionarios" : "No hay cuestionarios disponibles"}
                  </p>
                  <p className="text-white/40 text-sm mb-6 text-center px-4">
                    {hasActiveFilters
                      ? "Intenta ajustar los filtros de búsqueda"
                      : "Los cuestionarios aparecerán aquí cuando estén disponibles"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateEventModalOpen}
        onClose={() => {
          setIsCreateEventModalOpen(false)
          setSelectedCuestionForEvent(null)
        }}
        onCreateEvent={handleCreateEvent}
        selectedCuestion={selectedCuestionForEvent}
      />

      <CuestionDetailModal
        cuestion={selectedCuestion}
        isOpen={!!selectedCuestion}
        onClose={() => setSelectedCuestion(null)}
        onCreateEvent={handleCreateEventFromCuestion}
      />

      <EventsListModal
        isOpen={isEventsListModalOpen}
        onClose={() => setIsEventsListModalOpen(false)}
        events={events}
        onDeleteEvent={handleDeleteEvent}
      />


      <QuestionsListModal
        isOpen={isQuestionsListModalOpen}
        onClose={() => setQuestionsListModalOpen(false)}
      />

      <CreateQuestionModal
       isOpen={isCreateQuestionModalOpen}
       onClose={() =>{setIsCreateQuestionModalOpen(false)}}
      ></CreateQuestionModal>
    </div>
  )
}
