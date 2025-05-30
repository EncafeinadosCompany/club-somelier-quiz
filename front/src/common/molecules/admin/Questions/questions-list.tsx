import { question } from "@/api/types/questions.type"
import { Button } from "@/common/ui/button"
import {DialogContent,DialogHeader,DialogClose,DialogTitle,DialogFooter} from "@/common/ui/dialog"
import { getCategoryColor, getLevelColor } from "@/common/utils/colors"
import { FileText} from "lucide-react"

  interface QuestionsListModalProps {
    setSelectedQuestion: (question: question | null) => void
    setDetailModalOpen: (open: boolean) => void
    questions: question[]
  }

export const QuestionsList =  ({questions, setDetailModalOpen, setSelectedQuestion}:QuestionsListModalProps) =>{
  return(
    <DialogContent className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl xl:min-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-white">
        Mis Preguntas ({questions?.length})
      </DialogTitle>
    </DialogHeader>

    {questions?.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText className="h-16 w-16 text-white/30 mb-4" />
        <p className="text-white/60 text-lg mb-2">No tienes preguntas creadas</p>
        <p className="text-white/40 text-sm">Las preguntas que crees aparecerán aquí</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4  overflow-x-hidden overflow-y-auto max-h-[50vh]">
        {questions?.map((question) => (
          <div
            key={question.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-3 sm:p-4 cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-105"
            onClick={() => {
              setSelectedQuestion(question);
              setDetailModalOpen(true); // Abrir el modal de detalles
            }}
          >
            <div className="flex flex-col gap-2 mb-3">
              <h3 className="text-white font-semibold text-sm sm:text-lg leading-tight flex-1 min-w-0 break-words">
                {question.question}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getLevelColor(question.level)}`}>
                  {question.level}
                </span>
                <span className={`text-sm font-medium ${question.response ? 'text-green-500' : 'text-red-500'}`}>
                  {question.response ? 'Verdadero' : 'Falso'}
                </span>
              </div>
            </div>

            {question.categories && question.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {question.categories.map((category) => (
                  <span
                    key={category.id}
                    className={`${getCategoryColor(category.name)} px-2 py-0.5 rounded-full text-xs text-white font-medium`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )}

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
  )
}