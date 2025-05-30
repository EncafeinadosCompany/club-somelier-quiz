import { useQuestionnaireByIDQuery } from "@/api/query/cuestions.queries";
import { GetQuestionnaire } from "@/api/types/quetionnaire.type";
import QuestionnaireDetail from "./questionnaire-detail.view";

export default function QuestionnaireDetailPage() {
  const handleSave = (draft: GetQuestionnaire) => {
    // Tu lógica de guardado
    console.log('Guardando:', draft);
  };

  const handleCreateEvent = (draft: GetQuestionnaire) => {
    // Tu lógica para crear evento
    console.log('Creando evento:', draft);
  };

  return (
    <QuestionnaireDetail
      useQuestionnaireByIDQuery={useQuestionnaireByIDQuery}
      onSave={handleSave}
      onCreateEvent={handleCreateEvent}
    />
  );
}