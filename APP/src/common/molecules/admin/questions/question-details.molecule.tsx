import { question } from "@/api/types/questions.type";

import { Badge } from "@/common/ui/badge";
import { Button } from "@/common/ui/button";
import { Card } from "@/common/ui/card";
import { CheckCircle, Edit, Trash2, XCircle } from "lucide-react";

interface QuestionDetailsProps {
    selectedQuestion: question;
    setIsEditing: (isEditing: boolean) => void;
    setDeleteDialogOpen: (open: boolean) => void;


}


export default function QuestionDetails({ selectedQuestion, setIsEditing, setDeleteDialogOpen }: QuestionDetailsProps) {

    console.log("Selected question details:", selectedQuestion.categories);
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-white">
                    Detalles
                </h3>
                <div className="flex space-x-2">
                    <Button
                        onClick={() => setDeleteDialogOpen(true)}
                        variant="outline"
                        className="bg-red-900 hover:bg-red-500/30 text-white border-red-500/30"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                    </Button>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                    </Button>
                </div>
            </div>

            <Card className="bg-white/20 backdrop-blur-lg border border-white/20 p-4 mb-4 flex-grow">
                <h3 className="text-white font-medium mb-2">Pregunta</h3>
                <p className="text-white/90">{selectedQuestion.question}</p>
            </Card>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <Card className="bg-white/20 backdrop-blur-lg border border-white/20 p-4">
                    <h3 className="text-white font-medium mb-2">Respuesta</h3>
                    <div className="flex items-center space-x-2">
                        {selectedQuestion.response ? (
                            <>
                                <CheckCircle className="h-10 w-10 text-green-400" />
                                <span className="text-white">Realidad</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="h-10 w-10 text-red-400" />
                                <span className="text-white">Mito</span>
                            </>
                        )}
                    </div>
                </Card>

                <Card className="bg-white/20 backdrop-blur-lg border border-white/20 p-4">
                    <h3 className="text-white font-medium mb-2">Nivel</h3>
                    <p className="text-white">{selectedQuestion.level}</p>
                </Card>
            </div>

            <Card className="bg-white/20 backdrop-blur-lg border border-white/20 p-4 max-h-[150px]">
                <h3 className="text-white font-medium mb-3">Categorías</h3>
                <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[90px] pr-2">
                    {selectedQuestion.categories && selectedQuestion.categories.length > 0 ? (
                        selectedQuestion.categories.map((category) => (
                            <Badge
                                key={category.id}
                                className="bg-blue-500/30 text-blue-100 border-blue-500/50 px-3 py-1"
                            >
                                {category.name}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-white/70">No hay categorías asignadas</p>
                    )}
                </div>
            </Card>
        </div>
    )
}