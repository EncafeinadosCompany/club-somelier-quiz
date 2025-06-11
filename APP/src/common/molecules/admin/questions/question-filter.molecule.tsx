// (API Types)
import { Getcategories } from "@/api/types/categories.type"
import { Getlevel } from "@/api/types/levels.type"
import { Nivel } from "@/api/types/nivel.type"
import { question } from "@/api/types/questions.type"

// UI Components
import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/ui/select"

// Icons
import { Filter, Search, X } from "lucide-react"

interface FilterProps {
    // Main data
    questions: question[]
    categories: Getcategories[]
    nivels: Nivel[]

    // Active filters
    categoryFilter: number | null
    levelFilter?: string | null
    responseFilter?: boolean | null
    searchTerm?: string

    // status and actions
    isLoaded?: boolean
    filteredQuestions: question[]
    hasActiveFilters: string | boolean
    clearFilters: () => void
    setLevelFilter: (level: string | null) => void
    setResponseFilter: (response: boolean | null) => void
    setCategoryFilter: (categoryId: number | null) => void
    setSearchTerm: (term: string) => void
}

// Main component to filter questions

export default function QuestionFilter({
    categories,
    questions,
    nivels,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    levelFilter,
    filteredQuestions,
    setLevelFilter,
    setCategoryFilter,
    responseFilter,
    setResponseFilter,
    isLoaded,
    hasActiveFilters,
    clearFilters
}: FilterProps) {
    return (
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
                    <label className="block text-white/80 text-sm font-medium mb-2">Buscar preguntas</label>
                    <div className="relative">
                        <Search className="absolute left-1 top-1/2 h-4 w-4 z-30 -translate-y-1/2 text-gray-200" />
                        <Input
                            type="text"
                            placeholder="Buscar por texto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/20 border-white/20 text-white placeholder:text-gray-100 pl-6 "
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-2">Filtrar por categoría</label>
                    <Select
                        value={categoryFilter === null ? "all" : categoryFilter.toString()}
                        onValueChange={(value) => setCategoryFilter(value === "all" ? null : parseInt(value))}
                    >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Todas las categorías" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las categorías</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Level Filter */}
                <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-2">Filtrar por nivel</label>
                    <Select
                        value={levelFilter === null ? "all" : levelFilter}
                        onValueChange={(value) => setLevelFilter(value === "all" ? null : value)}
                    >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Todos los niveles" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los niveles</SelectItem>
                            {nivels.map((nivel) => (
                                <SelectItem key={nivel.id} value={nivel.name}>
                                    {nivel.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Response Filter */}
                <div className="mb-4">
                    <label className="block text-white/80 text-sm font-medium mb-2">Filtrar por respuesta</label>
                    <Select
                        value={responseFilter === null ? "all" : responseFilter ? "true" : "false"}
                        onValueChange={(value) => {
                            if (value === "all") setResponseFilter(null)
                            else setResponseFilter(value === "true")
                        }}
                    >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Cualquier respuesta" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Cualquier respuesta</SelectItem>
                            <SelectItem value="true">Realidad</SelectItem>
                            <SelectItem value="false">Mito</SelectItem>
                        </SelectContent>
                    </Select>
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
                <div className="bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
                    <h4 className="text-white font-medium mb-3">Estadísticas</h4>
                    <div className="space-y-2 text-sm text-white/80">
                        <div className="flex justify-between">
                            <span>Total preguntas:</span>
                            <span className="font-medium text-white">{questions.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Preguntas filtradas:</span>
                            <span className="font-medium text-white">{filteredQuestions.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Verdaderas:</span>
                            <span className="font-medium text-white">{questions.filter(q => q.response).length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Falsas:</span>
                            <span className="font-medium text-white">{questions.filter(q => !q.response).length}</span>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <h4 className="text-white font-medium mb-3">Categorías</h4>
                    <div className="space-y-2 text-sm">
                        {categories.map((category) => (
                            <div key={category.id} className="flex justify-between text-white/80">
                                <span>{category.name}</span>
                                <span>{questions.filter(q => q.categories.some(c => c.id === category.id)).length}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}