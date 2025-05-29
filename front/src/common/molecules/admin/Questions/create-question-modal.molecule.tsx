"use client"

import React from "react"
import { useState } from "react"
import { X, Calendar, Clock, Tag, FileText, User } from "lucide-react"
import { GetCuestion } from "@/api/types/cuestion.type"
import { Textarea } from "@/common/ui/textarea"
import { Button } from "@/common/ui/button"
import { question } from "@/api/types/questions.type"
import { DialogContent, DialogHeader, DialogClose, DialogTitle, DialogFooter } from "@/common/ui/dialog"
import { Dialog } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { CreateQuestion, CreateQuestionSchema } from "@/api/schemas/questions.schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/common/ui/form"
import { Input } from "@/common/ui/input"

interface CreateEventModalProps {
    isOpen: boolean
    onClose: () => void
    //   selectedCuestion?: GetCuestion | null
}

export default function CreateQuestionModal({ isOpen, onClose }: CreateEventModalProps) {


    const method = useForm<CreateQuestion>({
        resolver: zodResolver(CreateQuestionSchema),
        defaultValues: {
            categories: [],

        }
    })
    const [formData, setFormData] = useState({
        fecha: "",
        hora: "",
        // nombre: selectedCuestion ? `Evento: ${selectedCuestion.title}` : "",
        // descripcion: selectedCuestion ? selectedCuestion.description : "",
        // categoria: selectedCuestion ? selectedCuestion.categorie : "",
    })


    const handleCreateQuestion = (question: question) => {


    }

    const onSubmit = (values: CreateQuestion) => {

        console.log(values)
  
        // if (formData.nombre && formData.fecha && formData.hora) {
        //  console.log(formData)

        //   onClose()
        // }
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    console.log(isOpen)
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl xl:min-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">
                        Crear Pregunta
                    </DialogTitle>
                </DialogHeader>
                <Form {...method}>
                    <form onSubmit={method.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={method.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-blue-300">Submit</Button>
                    </form>
                </Form>
                <p>holaaaa</p>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button
                            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            variant="outline"
                        >
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
