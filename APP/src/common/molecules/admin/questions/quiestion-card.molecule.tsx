import { question } from "@/api/types/questions.type";
import { Badge } from "@/common/ui/badge";
import { Tag } from "lucide-react";

interface QuestionProps {
    question: question;
    selectedQuestionId: number | null;
    setSelectedQuestionId: (id: number | null) => void;
    setIsEditing: (isEditing: boolean) => void;
    setIsCreating: (isCreating: boolean) => void;
}

export default function QuestionCard({question, selectedQuestionId, setSelectedQuestionId, setIsCreating, setIsEditing}: QuestionProps) {
    return (
        <div
            key={question.id}
            onClick={() => {
                setSelectedQuestionId(question.id)
                setIsEditing(false)
                setIsCreating(false)
            }}
            className={`bg-white/20 backdrop-blur-lg rounded-lg border cursor-pointer 
                      ${selectedQuestionId === question.id ? 'border-blue-400 bg-white/20' : 'border-white/20'} 
                      p-4 hover:bg-white/20 transition-all duration-200 `}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-medium text-lg line-clamp-2">{question.question}</h3>
                <Badge className={`${question.response ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {question.response ? 'Realidad' : 'Mito'}
                </Badge>
            </div>
            <div className="flex items-center text-white/70 text-sm mb-3">
                <Tag className="h-4 w-4 mr-2" />
                <span>{question.level}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {question.categories.map((category) => (
                    <Badge key={category.id} className="bg-blue-500/30 text-blue-100 border-blue-500/50">
                        {category.name}
                    </Badge>
                ))}
            </div>
        </div>
    )
} 