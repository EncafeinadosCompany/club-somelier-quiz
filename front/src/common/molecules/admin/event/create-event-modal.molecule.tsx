"use client"

import React, { useEffect } from "react"
import { X, Clock, AlarmClock, User } from "lucide-react"

import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/common/ui/form"
import { createPostEventSchema, type CreateEventInput,type Event} from "@/api/schemas/event.schema"
import { GetQuestionnaire } from "@/api/types/quetionnaire.type"

interface EventFormModalProps {
  isOpen: boolean
  onClose: () => void
 
  initialData?: Event
  isEditing?: boolean
  selectedCuestion?: GetQuestionnaire | null
}

export default function EventFormModal({ 
  isOpen, 
  onClose, 

  initialData, 
  isEditing = false,
  selectedCuestion
}: EventFormModalProps) {
  
  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createPostEventSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      start_time: initialData.start_time,
      end_time: initialData.end_time
    } : {
      name: selectedCuestion ? `Evento: ${selectedCuestion.title}` : "",
      start_time: "",
      end_time: ""
    }
  })

  // Reset form when initialData changes
  useEffect(() => {
    if (isEditing && initialData) {
      form.reset({
        name: initialData.name,
        start_time: initialData.start_time,
        end_time: initialData.end_time
      })
    } else if (selectedCuestion) {
      form.reset({
        name: `Evento: ${selectedCuestion.title}`,
        start_time: "",
        end_time: ""
      })
    } else {
      form.reset({
        name: "",
        start_time: "",
        end_time: ""
      })
    }
  }, [form, initialData, isEditing, selectedCuestion])


  const  onSubmit=(data:any)=>{
    console.log(data)
  }

  const handleFormSubmit = (data: CreateEventInput) => {
    onSubmit(data)
    
    onClose()
  }


  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {isEditing 
              ? "Editar Evento" 
              : (selectedCuestion 
                ? "Crear Evento desde Cuestionario" 
                : "Crear Nuevo Evento")}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white transition-colors"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedCuestion && !isEditing && (
          <div className="mb-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <p className="text-blue-200 text-sm">
              <strong>Basado en:</strong> {selectedCuestion.title}
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80 text-sm font-medium">
                    <User className="inline h-4 w-4 mr-2" />
                    Nombre del Evento
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Ingresa el nombre del evento"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Hora de inicio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">
                      <AlarmClock className="inline h-4 w-4 mr-2" />
                      Hora de fin
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
              <Button 
                type="submit" 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isEditing ? "Guardar Cambios" : "Crear Evento"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}