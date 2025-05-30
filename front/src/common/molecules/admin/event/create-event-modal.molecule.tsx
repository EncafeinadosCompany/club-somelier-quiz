"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EventFormData, eventFormSchema, formatToDateInput, formatToTimeInput } from "@/api/schemas/event.schema"
import { X, Calendar, Clock, AlarmClock, User } from "lucide-react"
import { Button } from "@/common/ui/button"
import { Input } from "@/common/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/ui/form"

import { EventDetail } from "@/api/types/events.types"
import { GetQuestionnaire } from "@/api/types/quetionnaire.type"
import { useCreateEventMutation, useUpdateEventMutation } from "@/api/mutations/events.mutation"

// Define form input type explicitly
interface EventFormInputs {
  name: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
}


interface EventFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: EventDetail
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

  const { mutateAsync: useCreateEvent } = useCreateEventMutation()
  const { mutateAsync: useEditEvent } = useUpdateEventMutation()


  // Define form with explicit type
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      start_date: formatToDateInput(initialData.start_time),
      start_time: formatToTimeInput(initialData.start_time),
      end_date: formatToDateInput(initialData.end_time),
      end_time: formatToTimeInput(initialData.end_time),
    } : {
      name: selectedCuestion ? `Evento: ${selectedCuestion.title}` : "",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
    }
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (isEditing && initialData) {
      form.reset({
        name: initialData.name,
        start_date: formatToDateInput(initialData.start_time),
        start_time: formatToTimeInput(initialData.start_time),
        end_date: formatToDateInput(initialData.end_time),
        end_time: formatToTimeInput(initialData.end_time)
      });
    } else if (selectedCuestion) {
      form.reset({
        name: `Evento: ${selectedCuestion.title}`,
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: ""
      });
    } else {
      form.reset({
        name: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: ""
      });
    }
  }, [form, initialData, isEditing, selectedCuestion]);

  const handleFormSubmit = (data: EventFormInputs) => {
    // Manually transform the data
    const startDateTime = new Date(`${data.start_date}T${data.start_time}`);
    const endDateTime = new Date(`${data.end_date}T${data.end_time}`);

    const transformedData = {
      questionnaire_id: selectedCuestion?.id || 0,
      name: data.name,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString()
    };

    console.log(transformedData);

    if (isEditing && initialData?.id) {

      console.log('id',initialData.id)
       useEditEvent({ id: initialData.id, data: transformedData })
    } else {

      useCreateEvent(transformedData, {
        onSuccess: (newEvent) => {
          console.log('Event created:', newEvent);
          // Additional success handling if needed
        }
      });
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? "Editar Evento" : "Crear Nuevo Evento"}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Fecha de inicio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80 text-sm font-medium">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Fecha de fin
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
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
  );
}