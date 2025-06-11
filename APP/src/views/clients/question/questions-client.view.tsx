import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuestionnaire } from '@/api/query/quiz.queries';
import { MainLayout } from '@/common/widgets/clients/main-layout.widget';
import { QuestionsWidget } from '@/common/widgets/clients/questions.widget';

interface LocationState {
  questionnaireId: number;
  participantId: string;
  accessCode: string;
}

export default function QuestionsView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questionnaireId, participantId, accessCode } = state as LocationState;

  const { data: questionnaire } = useQuestionnaire(questionnaireId);

  useEffect(() => {
    if (!questionnaireId || !participantId || !accessCode) {
      navigate('/', { replace: true });
    }
  }, [questionnaireId, participantId, accessCode, navigate]);

  return (
    <MainLayout backgroundVariant="gradient">
      <QuestionsWidget
        questionnaireId={questionnaireId}
        participantId={participantId}
        accessCode={accessCode}
        questionnaire={questionnaire}
      />
    </MainLayout>
  );
}