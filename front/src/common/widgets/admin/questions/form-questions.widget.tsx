"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/common/ui/form"
import { Input } from "@/common/ui/input"
import { Textarea } from "@/common/ui/textarea"
import { Button } from "@/common/ui/button"
import { Switch } from "@/common/ui/switch"
import { Checkbox } from "@/common/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/ui/select"
import { CheckCircle, XCircle, Tag, Save, X } from "lucide-react"
import { questionFormSchema, QuestionFormData } from "@/api/schemas/questions.schema"
import { useCategoriesQuery } from "@/api/query/category.queries"
import { question } from "@/api/types/questions.type"

interface QuestionFormProps {
  initialData?: question | null;
  isEditing?: boolean;
  onSubmit: (data: QuestionFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function QuestionForm({
  initialData,
  isEditing = false,
  onSubmit,
  onCancel,
  isSubmitting = false
}: QuestionFormProps) {
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesQuery();
  
  // Helper to get level_id from level name
  const getLevelIdFromName = (levelName?: string): number => {
    if (!levelName) return 1;
    
    // Map level names to IDs
    const levelMap: Record<string, number> = {
      "Básico": 1,
      "Intermedio": 2,
      "Avanzado": 3,
      "Experto": 4
    };
    return levelMap[levelName] || 1;
  };

  // Form setup with zod schema
  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: initialData ? {
      question: initialData.question,
      response: initialData.response,
      level_id: getLevelIdFromName(initialData.level),
      categories: initialData.categories.map(cat => cat.id)
    } : {
      question: "",
      response: false,
      level_id: 1,
      categories: []
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        question: initialData.question,
        response: initialData.response,
        level_id: getLevelIdFromName(initialData.level),
        categories: initialData.categories.map(cat => cat.id)
      });
    } else {
      form.reset({
        question: "",
        response: false,
        level_id: 1,
        categories: []
      });
    }
  }, [form, initialData]);

  const handleSubmit = (data: QuestionFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80 text-sm font-medium">
                Pregunta
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe la pregunta aquí..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="response"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80 text-sm font-medium">
                  Respuesta
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <div className="flex items-center">
                      {field.value ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-400 mr-1" />
                          <span className="text-white">Realidad</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-400 mr-1" />
                          <span className="text-white">Mito</span>
                        </>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white/80 text-sm font-medium">
                  <Tag className="inline h-4 w-4 mr-2" />
                  Nivel de dificultad
                </FormLabel>
                <Select
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Selecciona el nivel" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Básico</SelectItem>
                    <SelectItem value="2">Intermedio</SelectItem>
                    <SelectItem value="3">Avanzado</SelectItem>
                    <SelectItem value="4">Experto</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel className="text-white/80 text-sm font-medium">
                Categorías (selecciona al menos una)
              </FormLabel>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 bg-white/10 border-white/20 border rounded-md p-3">
                {isLoadingCategories ? (
                  <div className="text-white/60 text-center py-4">Cargando categorías...</div>
                ) : (
                  categories.map((category) => (
                    <FormField
                      key={category.id}
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem key={category.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, category.id])
                                    : field.onChange(field.value?.filter((value) => value !== category.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-white cursor-pointer font-normal">
                              {category.name}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
            variant="outline"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Guardar Cambios" : "Crear Pregunta"}
          </Button>
        </div>
      </form>
    </Form>
  );
}