"use client"


import { UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/common/ui/form"
import { motion } from "framer-motion"
import { Textarea } from "@/common/ui/textarea"
import { Button } from "@/common/ui/button"
import { Switch } from "@/common/ui/switch"
import { Checkbox } from "@/common/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/ui/select"
import { RadioGroup, RadioGroupItem } from "@/common/ui/radio-group"
import { CheckCircle, XCircle, Tag, Save, X } from "lucide-react"
import { QuestionFormData } from "@/api/schemas/questions.schema"
import { Nivel } from "@/api/types/nivel.type"
import { Getcategories } from "@/api/types/categories.type"


interface FormQuestionProps {
  form: UseFormReturn<any>
  handleSubmit: (data: QuestionFormData) => void
  nivels: Nivel[]
  categories: Getcategories[]
  onCancel: () => void
  isLoadingNiveles: boolean
  isLoadingCategories: boolean
  isSubmitting: boolean
  isEditing: boolean
}


export default function FormQuestion({ form, handleSubmit, isLoadingNiveles, isEditing, isLoadingCategories, isSubmitting, nivels, categories, onCancel }: FormQuestionProps) {
  return (
  <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full space-y-4">
        {/* Pregunta con tamaño ajustado - ahora más grande */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className=" h-full max-h-[25vh]">
              <FormLabel className="text-white/80 text-sm font-medium mb-1">
                Pregunta
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Escribe la pregunta aquí..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-full min-h-[120px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Respuesta */}
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white/80 text-xs font-medium">
                Respuesta
              </FormLabel>
              <FormControl>
                <motion.div
                  className="flex items-center space-x-2"
                  whileTap={{ scale: 0.97 }}
                >
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <div className="flex items-center">
                    {field.value ? (
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-white text-sm">Realidad</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <XCircle className="h-4 w-4 text-red-400 mr-1" />
                        <span className="text-white text-sm">Mito</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Nivel con Radio Group */}
        <FormField
          control={form.control}
          name="level_id"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-white/80 text-xs font-medium">
                <Tag className="inline h-3 w-3 mr-1" />
                Nivel de dificultad
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString()}
                  className="flex space-x-4"
                >
                  {isLoadingNiveles ? (
                    <div className="text-white/60 text-sm">Cargando niveles...</div>
                  ) : (
                    nivels.map((nivel) => (
                      <FormItem key={nivel.id} className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value={nivel.id?.toString() || ""} 
                            id={`nivel-${nivel.id}`}
                            className="text-blue-500 border-white/50"
                          />
                        </FormControl>
                        <FormLabel 
                          htmlFor={`nivel-${nivel.id}`}
                          className="text-white cursor-pointer font-normal text-sm m-0"
                        >
                          {nivel.name}
                        </FormLabel>
                      </FormItem>
                    ))
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categorías con diseño de grilla */}
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem className="flex-shrink-0">
              <div className="flex justify-between items-center mb-1">
                <FormLabel className="text-white/80 text-xs font-medium">
                  Categorías (selecciona al menos una)
                </FormLabel>
                <span className="text-white/60 text-xs">
                  {form.watch("categories")?.length || 0} seleccionadas
                </span>
              </div>
              <div className="h-[120px] overflow-y-auto pr-2 bg-white/10 border-white/20 border rounded-md p-2">
                {isLoadingCategories ? (
                  <div className="text-white/60 text-center py-2 text-sm">Cargando categorías...</div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {categories.map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem key={category.id} className="flex items-center space-x-2 space-y-0 py-1">
                            <FormControl>
                              <Checkbox
                                className="data-[state=checked]:bg-blue-500"
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, category.id])
                                    : field.onChange(field.value?.filter((value: any) => value !== category.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-white cursor-pointer font-normal text-sm m-0">
                              {category.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botones de acción - ahora en la parte inferior */}
        <div className="flex gap-2 pt-4 mt-auto">
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
            variant="outline"
          >
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isSubmitting || isLoadingNiveles}
          >
            <Save className="h-4 w-4 mr-1" />
            {isEditing ? "Guardar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}