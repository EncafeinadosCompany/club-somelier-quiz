"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Search, Filter, X, Plus, Save, Trash2, GripVertical, ChevronDown, ChevronUp, Check } from "lucide-react"
import toast from "react-hot-toast"

// Import DnD-Kit libraries instead of react-beautiful-dnd
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  useSortable,
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Form and UI components
import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import { Textarea } from "@/common/ui/textarea"
import { Card } from "@/common/ui/card"
import { Badge } from "@/common/ui/badge"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/common/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/ui/select"
import { Checkbox } from "@/common/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/ui/accordion"
import { Skeleton } from "@/common/ui/skeleton"

// API Queries and Mutations
import { useQuestionsQuery } from "@/api/query/questions.queries"
import { useCategoriesQuery } from "@/api/query/category.queries" 
import { useNivelesQuery } from "@/api/query/level.queries"
import { useCreateQuestionnaireMutation, useUpdateQuestionnaireMutation } from "@/api/mutations/quetionnaire.mutation"

// Types and Schema
import { questionnaireFormSchema} from "@/api/schemas/quetionnaire.schemas"
import { question } from "@/api/types/questions.type"
import { GetQuestionnaire } from "@/api/types/quetionnaire.type"
import { QuestionnaireFormData } from "@/api/schemas/quetionnaire.schemas"

// Sortable question item component
const SortableQuestionItem = ({ 
  question, 
  index, 
  onRemove 
}: { 
  question: question; 
  index: number; 
  onRemove: (id: number) => void; 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: question.id.toString(),
    data: question
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 flex items-start 
                 ${isDragging ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-3 mt-1 cursor-grab text-white/60 hover:text-white touch-none"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-white font-medium">
            {index + 1}. {question.question}
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(question.id)}
            className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <Badge className={`${question.response ? 'bg-green-500/60' : 'bg-red-500/60'} text-white`}>
            {question.response ? 'Verdadero' : 'Falso'}
          </Badge>
          <Badge className="bg-blue-500/30 text-blue-100">
            {question.level}
          </Badge>
        </div>
      </div>
    </div>
  );
};

interface QuestionnaireFormProps {
  initialData?: GetQuestionnaire | null;
  isEditing?: boolean;
}

export default function QuestionnaireFormView({ initialData, isEditing = false }: QuestionnaireFormProps) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [accordionValue, setAccordionValue] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("questions");

  // API Queries
  const { data: allQuestions = [], isLoading: isLoadingQuestions } = useQuestionsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesQuery();
  const { data: niveles = [], isLoading: isLoadingNiveles } = useNivelesQuery();
  
  // Mutations
  const createQuestionnaireMutation = useCreateQuestionnaireMutation();
  const updateQuestionnaireMutation = useUpdateQuestionnaireMutation();

  // Setup DnD-Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Setup form with Zod validation
  const form = useForm<QuestionnaireFormData>({
    resolver: zodResolver(questionnaireFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      // categories: initialData?.categories.map(cat => typeof cat.id === 'number' ? cat.id : parseInt(cat.id.toString())) || [],
      questions: initialData?.questions?.map(q => q.id) || []
    },
  });

  // Load initial data if in edit mode
  useEffect(() => {
    if (initialData && isEditing) {
      form.reset({
        title: initialData.title,
        description: initialData.description,
        // categories: initialData.categories.map(cat => typeof cat.id === 'number' ? cat.id : parseInt(cat.id.toString())),
        questions: initialData.questions?.map(q => q.id) || []
      });
      
      // Populate selected questions array with full question objects
      if (initialData.questions && allQuestions.length > 0) {
        const questions = initialData.questions.map(q => {
          const fullQuestion = allQuestions.find(full => full.id === q.id);
          return fullQuestion || {
            id: q.id,
            question: q.question,
            response: q.response,
            level: q.levelName,
            categories: []
          };
        });
        setSelectedQuestions(questions);
      }
    }
    setIsLoaded(true);
  }, [initialData, isEditing, allQuestions]);

  // Filter questions based on search and filters
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      // Text search
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = categoryFilter === null || 
        q.categories.some(cat => cat.id === categoryFilter);
      
      // Level filter
      const matchesLevel = levelFilter === null || q.level === levelFilter;
      
      // Already selected filter (exclude already selected questions)
      const isNotSelected = !selectedQuestions.some(selected => selected.id === q.id);
      
      return matchesSearch && matchesCategory && matchesLevel && isNotSelected;
    });
  }, [allQuestions, searchTerm, categoryFilter, levelFilter, selectedQuestions]);

  // Handle drag end for reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setSelectedQuestions((items) => {
        const oldIndex = items.findIndex(item => item.id.toString() === active.id);
        const newIndex = items.findIndex(item => item.id.toString() === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update the form value with the new order
        const questionIds = newItems.map(q => q.id);
        form.setValue('questions', questionIds, { shouldValidate: true });
        
        return newItems;
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter(null);
    setLevelFilter(null);
  };

  const hasActiveFilters = searchTerm || categoryFilter !== null || levelFilter !== null;

  // Add a question to the selected list
  const handleAddQuestion = (question: question) => {
    setSelectedQuestions(prev => {
      // Add with position equal to the array length
      const newQuestion = { ...question };
      return [...prev, newQuestion];
    });
    
    // Update the form's questions array
    const currentQuestions = form.getValues().questions || [];
    form.setValue('questions', [...currentQuestions, question.id], { shouldValidate: true });
  };

  // Remove a question from the selected list
  const handleRemoveQuestion = (questionId: number) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
    
    // Update the form's questions array
    const currentQuestions = form.getValues().questions || [];
    form.setValue(
      'questions', 
      currentQuestions.filter(id => id !== questionId),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: QuestionnaireFormData) => {
    try {
      // Use the selectedQuestions order for the questions array
      // This ensures the position order is preserved
      const orderedQuestionIds = selectedQuestions.map(q => q.id);
      data.questions = orderedQuestionIds;
      
      if (isEditing && initialData) {
        await updateQuestionnaireMutation.mutate({
          id: initialData.id,
          data
        }, {
          onSuccess: () => {
            navigate('/admin');
          }
        });
      } else {
        await createQuestionnaireMutation.mutate(data, {
          onSuccess: () => {
            navigate('/admin');
          }
        });
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  // Check for selected categories to filter available questions
  const selectedCategories = form.watch('categories') || [];
  
  // Quick-filter available questions based on selected categories
  const questionsInSelectedCategories = useMemo(() => {
    if (!selectedCategories.length) return allQuestions;
    
    return allQuestions.filter(question => 
      question.categories.some(cat => selectedCategories.includes(cat.id))
    );
  }, [allQuestions, selectedCategories]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop"
        alt="Beautiful mountain landscape"
        className="object-cover absolute h-full w-full"
      />

      {/* Main Content */}
      <main className="relative h-screen w-full pt-5 flex overflow-hidden">
        {/* Form Panel */}
        <div 
          className={`w-1/2 h-full bg-white/10 backdrop-blur-lg p-6 shadow-xl border-r border-white/20 opacity-100 ${
            isLoaded ? "animate-fade-in" : ""
          } flex flex-col`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Editar Cuestionario' : 'Crear Nuevo Cuestionario'}
            </h2>
            <Button 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              onClick={() => navigate('/admin')}
            >
              Cancelar
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-[80vh]">
              <div className="space-y-4 overflow-y-auto flex-1 pr-2">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Título</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ingresa un título para el cuestionario" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Descripción</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe el propósito de este cuestionario" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Categories Field */}
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Categorías</FormLabel>
                      <div className="bg-white/10 border-white/20 border rounded-md p-4">
                        <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto">
                          {isLoadingCategories ? (
                            Array(6).fill(0).map((_, i) => (
                              <Skeleton key={i} className="h-8 bg-white/10" />
                            ))
                          ) : (
                            categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`category-${category.id}`}
                                  checked={field.value?.includes(category.id)}
                                  onCheckedChange={(checked) => {
                                    let updated = [...(field.value || [])];
                                    if (checked) {
                                      updated.push(category.id);
                                    } else {
                                      updated = updated.filter(id => id !== category.id);
                                    }
                                    field.onChange(updated);
                                  }}
                                  className="data-[state=checked]:bg-blue-500"
                                />
                                <label 
                                  htmlFor={`category-${category.id}`}
                                  className="text-white cursor-pointer"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Selected Questions Field - Modified to use DnD-Kit */}
                <FormField
                  control={form.control}
                  name="questions"
                  render={() => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-white font-medium">Preguntas Seleccionadas</FormLabel>
                        <Badge className="bg-blue-500 text-white">
                          {selectedQuestions.length} preguntas
                        </Badge>
                      </div>
                      
                      {selectedQuestions.length > 0 ? (
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext 
                            items={selectedQuestions.map(q => q.id.toString())} 
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                              {selectedQuestions.map((question, index) => (
                                <SortableQuestionItem
                                  key={question.id}
                                  question={question}
                                  index={index}
                                  onRemove={handleRemoveQuestion}
                                />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      ) : (
                        <div className="text-center py-8 bg-white/10 border border-white/20 rounded-lg">
                          <p className="text-white/70">
                            No hay preguntas seleccionadas.
                          </p>
                          <p className="text-white/50 text-sm mt-1">
                            Añade preguntas desde el panel de la derecha.
                          </p>
                        </div>
                      )}
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={createQuestionnaireMutation.isPending || updateQuestionnaireMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? 'Guardar Cambios' : 'Crear Cuestionario'}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Questions Selection Panel */}
        <div
          className={`w-1/2 h-full flex flex-col opacity-100 ${
            isLoaded ? "animate-fade-in" : ""
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="p-6 h-full flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4">
              Preguntas Disponibles
            </h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-white/10 border-white/20 border">
                <TabsTrigger value="questions" className="text-white data-[state=active]:bg-white/20">
                  Todas las Preguntas
                </TabsTrigger>
                <TabsTrigger value="filtered" className="text-white data-[state=active]:bg-white/20">
                  Preguntas por Categoría
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions" className="flex-1 flex flex-col mt-4">
                {/* Filters */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-4 mb-4">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar Preguntas
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Search Filter */}
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Buscar</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                        <Input
                          type="text"
                          placeholder="Buscar por texto..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Category Filter */}
                      <div>
                        <label className="block text-white/80 text-sm mb-1">Categoría</label>
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
                      <div>
                        <label className="block text-white/80 text-sm mb-1">Nivel</label>
                        <Select
                          value={levelFilter === null ? "all" : levelFilter}
                          onValueChange={(value) => setLevelFilter(value === "all" ? null : value)}
                        >
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Todos los niveles" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos los niveles</SelectItem>
                            {niveles.map((nivel) => (
                              <SelectItem key={nivel.id} value={nivel.name}>
                                {nivel.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                </div>
                
                {/* Questions List */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {isLoadingQuestions ? (
                    Array(5).fill(0).map((_, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-4">
                        <Skeleton className="h-6 w-3/4 bg-white/20 mb-2" />
                        <div className="flex space-x-2 mt-3">
                          <Skeleton className="h-5 w-20 bg-white/20" />
                          <Skeleton className="h-5 w-20 bg-white/20" />
                        </div>
                      </div>
                    ))
                  ) : filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <div 
                        key={question.id}
                        className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-4 hover:bg-white/20 transition-colors"
                      >
                        <div className="flex justify-between">
                          <p className="text-white">{question.question}</p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleAddQuestion(question)}
                            className="h-8 w-8 p-0 bg-blue-500/20 text-blue-400 hover:text-blue-300 hover:bg-blue-500/40 border-blue-500/40"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center mt-3 space-x-2">
                          <Badge className={`${question.response ? 'bg-green-500/60' : 'bg-red-500/60'} text-white`}>
                            {question.response ? 'Verdadero' : 'Falso'}
                          </Badge>
                          <Badge className="bg-blue-500/30 text-blue-100">
                            {question.level}
                          </Badge>
                          {question.categories.map((category) => (
                            <Badge 
                              key={category.id} 
                              className="bg-purple-500/30 text-purple-100"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white/10 border border-white/20 rounded-lg">
                      <p className="text-white/70">
                        {hasActiveFilters ? "No se encontraron preguntas con los filtros aplicados." : "No hay preguntas disponibles."}
                      </p>
                      {hasActiveFilters && (
                        <Button
                          onClick={clearFilters}
                          variant="link"
                          className="text-blue-400 hover:text-blue-300 mt-2"
                        >
                          Limpiar filtros
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="filtered" className="flex-1 flex flex-col mt-4 overflow-y-auto">
                {selectedCategories.length === 0 ? (
                  <div className="text-center py-12 bg-white/10 border border-white/20 rounded-lg">
                    <p className="text-white/70">Selecciona categorías para ver las preguntas relacionadas.</p>
                  </div>
                ) : (
                  <Accordion 
                    type="multiple"
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                    className="space-y-3 pr-2"
                  >
                    {selectedCategories.map((categoryId:any) => {
                      const category = categories.find(c => c.id === categoryId);
                      if (!category) return null;
                      
                      const categoryQuestions = allQuestions.filter(q => 
                        q.categories.some(qc => qc.id === categoryId) && 
                        !selectedQuestions.some(sq => sq.id === q.id)
                      );
                      
                      return (
                        <AccordionItem 
                          key={categoryId} 
                          value={`category-${categoryId}`}
                          className="border-white/20 bg-white/10 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-white/10 text-white">
                            <div className="flex items-center">
                              {category.name}
                              <Badge className="ml-3 bg-white/20 text-white">
                                {categoryQuestions.length} preguntas
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3 pt-1">
                            <div className="space-y-3">
                              {categoryQuestions.length > 0 ? (
                                categoryQuestions.map((question) => (
                                  <div 
                                    key={question.id}
                                    className="bg-white/10 rounded-lg border border-white/20 p-3 hover:bg-white/15 transition-colors"
                                  >
                                    <div className="flex justify-between">
                                      <p className="text-white">{question.question}</p>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddQuestion(question)}
                                        className="h-7 w-7 p-0 bg-blue-500/20 text-blue-400 hover:text-blue-300 hover:bg-blue-500/40 border-blue-500/40"
                                      >
                                        <Plus className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                    <div className="flex items-center mt-2 space-x-2">
                                      <Badge className={`${question.response ? 'bg-green-500/60' : 'bg-red-500/60'} text-white text-xs`}>
                                        {question.response ? 'Verdadero' : 'Falso'}
                                      </Badge>
                                      <Badge className="bg-blue-500/30 text-blue-100 text-xs">
                                        {question.level}
                                      </Badge>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-white/60 text-center py-3">No hay preguntas disponibles para esta categoría.</p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}