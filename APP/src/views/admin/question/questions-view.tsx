"use client"

import { useState, useMemo } from "react"
import { Plus, FileText } from "lucide-react"
import { Button } from "@/common/ui/button"
import { useQuestionsQuery, useQuestionByIDQuery } from "@/api/query/questions.queries"
import { useCategoriesQuery } from "@/api/query/category.queries"
import { useCreateQuestionMutation, useDeleteQuestionMutation, useUpdateQuestionMutation } from "@/api/mutations/questions.mutation"

import { Skeleton } from "@/common/ui/skeleton"
import { Postquestion } from "@/api/types/questions.type"
import { QuestionForm } from "@/common/widgets/admin/questions/questions-form.widget"
import { QuestionFormData } from "@/api/schemas/questions.schema"


import { useNivelesQuery } from "@/api/query/level.queries"
import AnimatedBackground from "@/common/atoms/animated-background"
import QuestionFilter from "@/common/molecules/admin/questions/question-filter.molecule"
import DeleteQuestionConfirmation from "@/common/molecules/admin/questions/question-confirmation-delete.molecule"
import QuestionDetails from "@/common/molecules/admin/questions/question-details.molecule"
import QuestionCard from "@/common/molecules/admin/questions/quiestion-card.molecule"

export default function QuestionsView() {
    const [isLoaded, setIsLoaded] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isCreating, setIsCreating] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
    const [levelFilter, setLevelFilter] = useState<string | null>(null)
    const [responseFilter, setResponseFilter] = useState<boolean | null>(null)

    const { data: questions = [], isLoading } = useQuestionsQuery()
    const { data: categories = [] } = useCategoriesQuery()
    const { data: nivels = [] } = useNivelesQuery();

    const {
        data: selectedQuestion,
        isLoading: isLoadingDetails,
        isError: isErrorDetails
    } = useQuestionByIDQuery(selectedQuestionId)

    // Mutations
    const createQuestionMutation = useCreateQuestionMutation()
    const updateQuestionMutation = useUpdateQuestionMutation()
    const deleteQuestionMutation = useDeleteQuestionMutation()


    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            // Text search
            const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase())

            // Category filter
            const matchesCategory = categoryFilter === null ||
                q.categories.some(cat => cat.id === categoryFilter)

            // Level filter
            const matchesLevel = levelFilter === null ||
                q.level === levelFilter

            // Response filter (true/false)
            const matchesResponse = responseFilter === null ||
                q.response === responseFilter

            return matchesSearch && matchesCategory && matchesLevel && matchesResponse
        })
    }, [questions, searchTerm, categoryFilter, levelFilter, responseFilter])

    const clearFilters = () => {
        setSearchTerm("")
        setCategoryFilter(null)
        setLevelFilter(null)
        setResponseFilter(null)
    }

    const hasActiveFilters = searchTerm || categoryFilter !== null || levelFilter !== null || responseFilter !== null

    const startCreating = () => {
        setSelectedQuestionId(null)
        setIsEditing(true)
        setIsCreating(true)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setIsCreating(false)
    }

    const handleFormSubmit = (data: QuestionFormData) => {
        if (isCreating) {
            createQuestionMutation.mutate(data as Postquestion, {
                onSuccess: () => {
                    setIsEditing(false)
                    setIsCreating(false)
                }
            })
        } else if (selectedQuestionId) {
            updateQuestionMutation.mutate({
                id: selectedQuestionId,
                data
            }, {
                onSuccess: () => {
                    setIsEditing(false)
                }
            })
        }
    }

    const handleDelete = () => {
        if (selectedQuestionId) {
            deleteQuestionMutation.mutate(selectedQuestionId, {
                onSuccess: () => {
                    setSelectedQuestionId(null)
                    setDeleteDialogOpen(false)
                }
            })
        }
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden">

            <AnimatedBackground />

            <main className="relative h-[92vh] w-full pt-5 flex">

                {/* Filter */}

                <QuestionFilter
                    categories={categories}
                    questions={questions}
                    nivels={nivels}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryFilter={categoryFilter}
                    levelFilter={levelFilter}
                    responseFilter={responseFilter}
                    filteredQuestions={filteredQuestions}
                    setLevelFilter={setLevelFilter}
                    setCategoryFilter={setCategoryFilter}
                    setResponseFilter={setResponseFilter}
                    isLoaded={isLoaded}
                    hasActiveFilters={hasActiveFilters}
                    clearFilters={clearFilters}
                ></QuestionFilter>

                {/* Questions List */}
                <div
                    className={`w-1/3 flex-1 flex flex-col opacity-100 ${isLoaded ? "animate-fade-in" : ""} border-r border-white/20`}
                    style={{ animationDelay: "0.6s" }}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <FileText className="h-6 w-6 mr-3" />
                                Preguntas
                                {hasActiveFilters && (
                                    <span className="ml-3 text-sm bg-blue-500 px-2 py-1 rounded-full">
                                        {filteredQuestions.length} resultados
                                    </span>
                                )}
                            </h2>
                            <Button
                                onClick={startCreating}
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Pregunta
                            </Button>
                        </div>

                        <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                            {isLoading ? (

                                Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-4 hover:bg-white/20 transition-all duration-200">
                                        <Skeleton className="h-6 w-3/4 bg-white/20 mb-2" />
                                        <Skeleton className="h-4 w-1/4 bg-white/20 mb-3" />
                                        <Skeleton className="h-4 w-full bg-white/20 mb-2" />
                                        <Skeleton className="h-4 w-2/3 bg-white/20" />
                                    </div>
                                ))
                            ) : filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                        selectedQuestionId={selectedQuestionId}
                                        setSelectedQuestionId={setSelectedQuestionId}
                                        setIsEditing={setIsEditing}
                                        setIsCreating={setIsCreating}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FileText className="h-16 w-16 text-white/30 mb-4" />
                                    <p className="text-white/60 text-lg mb-2">
                                        {hasActiveFilters ? "No se encontraron preguntas" : "No hay preguntas disponibles"}
                                    </p>
                                    <p className="text-white/40 text-sm mb-6 text-center px-4">
                                        {hasActiveFilters
                                            ? "Intenta ajustar los filtros de búsqueda"
                                            : "Las preguntas aparecerán aquí cuando estén disponibles"}
                                    </p>
                                    <Button onClick={startCreating} className="bg-blue-500 hover:bg-blue-600 text-white">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Crear Nueva Pregunta
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Details / Edit */}
                <div
                    className={`w-1/3 flex flex-col opacity-100  ${isLoaded ? "animate-fade-in" : ""}`}
                    style={{ animationDelay: "0.8s" }}
                >
                    <div className="p-6 h-full">
                        {isCreating || (selectedQuestionId && isEditing) ? (
                            // Edit/Create Mode
                            <div className="h-full flex flex-col">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xl font-bold text-white">
                                        {isCreating ? "Crear Nueva Pregunta" : "Editar Pregunta"}
                                    </p>
                                </div>

                                <div className="bg-white/20 backdrop-blur-lg rounded-xl border border-white/20 p-4 overflow-y-auto flex-1">
                                    <QuestionForm
                                        initialData={isCreating ? null : selectedQuestion}
                                        isEditing={!isCreating}
                                        onSubmit={handleFormSubmit}
                                        onCancel={handleCancel}
                                        isSubmitting={createQuestionMutation.isPending || updateQuestionMutation.isPending}
                                    />
                                </div>
                            </div>
                        ) : selectedQuestionId ? (
                            isLoadingDetails ? (
                                <div className="h-full flex flex-col gap-4">
                                    <Skeleton className="h-8 w-3/4 bg-white/20" />
                                    <Skeleton className="h-6 w-1/3 bg-white/20" />
                                    <Skeleton className="h-40 w-full bg-white/20 my-4" />
                                    <Skeleton className="h-6 w-full bg-white/20" />
                                    <Skeleton className="h-6 w-2/3 bg-white/20" />
                                </div>
                            ) : isErrorDetails ? (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6 text-center">
                                        <h3 className="text-white text-lg font-medium mb-2">Error al cargar los detalles</h3>
                                        <p className="text-white/80">
                                            No se pudo cargar la información de la pregunta. Intente nuevamente.
                                        </p>
                                        <Button
                                            onClick={() => setSelectedQuestionId(null)}
                                            className="mt-4 bg-white/10 hover:bg-white/20 text-white"
                                        >
                                            Volver a la lista
                                        </Button>
                                    </div>
                                </div>
                            ) : selectedQuestion ? (
                                <QuestionDetails
                                    selectedQuestion={selectedQuestion}
                                    setIsEditing={setIsEditing}
                                    setDeleteDialogOpen={setDeleteDialogOpen}
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center">
                                    <p className="text-white/60">No se encontró información de la pregunta</p>
                                </div>
                            )
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center">
                                <FileText className="h-16 w-16 text-white/30 mb-4" />
                                <h3 className="text-white text-xl font-medium mb-2">Selecciona una pregunta</h3>
                                <p className="text-white/60 text-center mb-6">
                                    Haz clic en una pregunta de la lista para ver sus detalles
                                </p>
                                <Button
                                    onClick={startCreating}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Crear Nueva Pregunta
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Delete Confirmation Dialog */}
            <DeleteQuestionConfirmation
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                handleDelete={handleDelete}
            />
        </div>
    )
}