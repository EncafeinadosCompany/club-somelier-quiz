"use client"

import { useEffect, useState } from "react"
import { Trash2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/common/ui/button"
import { question } from "@/api/types/questions.type"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/common/ui/dialog"
import { useQuestionsQuery } from "@/api/query/questions.queries"
import { QuestionsList } from "../../molecules/admin/Questions/questions-list"
import { getCategoryColor, getLevelColor } from "@/common/utils/colors"

interface QuestionsListModalProps {
  isOpen: boolean
  onClose: () => void
  questions?: question[]

}

export default function QuestionsListModal({ 
  isOpen, 
  onClose, 
}: QuestionsListModalProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<question | null>(null)
  const [questions, setquestions] = useState<question[]>([])
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const {data} = useQuestionsQuery()

  useEffect(() => {
    if (data) {
      setquestions(data)
    }
  }, [data]) 



  const  onDeleteQuestion= (id: number) => {
    console.log('delete question', id)
    
  }


console.log(data)

 

  // Diálogo para mostrar detalles de una pregunta seleccionada
  const QuestionDetailDialog = () => (
    <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
      <DialogContent className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {selectedQuestion?.question}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-6">
          {/* Nivel de dificultad */}
          <div className="flex items-center">
            <span className="text-white mr-2">Nivel:</span>
            <span className={`font-medium ${getLevelColor(selectedQuestion?.level || '')}`}>
              {selectedQuestion?.level}
            </span>
          </div>
          
          {/* Respuesta correcta */}
          <div className="flex items-center">
            <span className="text-white mr-2">Respuesta:</span>
            {selectedQuestion?.response ? (
              <span className="flex items-center text-green-500">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verdadero
              </span>
            ) : (
              <span className="flex items-center text-red-500">
                <XCircle className="h-4 w-4 mr-1" />
                Falso
              </span>
            )}
          </div>

          {/* Categorías */}
          {selectedQuestion?.categories && selectedQuestion.categories.length > 0 && (
            <div>
              <span className="text-white block mb-2">Categorías:</span>
              <div className="flex flex-wrap gap-2">
                {selectedQuestion.categories.map((category) => (
                  <span
                    key={category.id}
                    className={`${getCategoryColor(category.name)} px-3 py-1 rounded-full text-white font-medium text-sm`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button
              className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
              variant="outline"
            >
              Volver
            </Button>
          </DialogClose>
          <Button
                onClick={() => {
                    if (selectedQuestion) {
                      onDeleteQuestion(selectedQuestion.id)
                      setSelectedQuestion(null)
                      setDetailModalOpen(false) // Cerrar el modal después de eliminar
                    }
                  }}
            className="bg-red-500 hover:bg-red-600 text-white px-4"
            variant="destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )


 

  // Diálogo principal que muestra la lista de preguntas
  return (
    <>
      <QuestionDetailDialog />
      
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <QuestionsList
          questions={questions}
          setDetailModalOpen={setDetailModalOpen}
          setSelectedQuestion={setSelectedQuestion}
        ></QuestionsList>
      </Dialog>
    </>
  )
}