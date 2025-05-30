import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/clients/main-layout.widget';
import { QuestionCard } from '../common/atoms/QuestionCard';
import { AnswerButtons } from '../common/molecules/AnswerButtons';
import { useQuestionnaire } from '../api/query/quiz.queries';
import { CheckCircle, XCircle } from 'lucide-react';
import { useEventSocketParticipant } from '../common/hooks/useEventSocket';

interface LocationState {
  questionnaireId: number;
  participantId: string;
  accessCode: string;
}

export function QuestionsView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questionnaireId, participantId, accessCode } = state as LocationState;

  const { data: questionnaire } = useQuestionnaire(questionnaireId);
  const {
    currentQuestion,
    answerAck,
    submitAnswer,
    noMoreQuestions,
    eventEnded,
    results
  } = useEventSocketParticipant(accessCode, participantId);

  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!questionnaireId || !participantId || !accessCode) {
      navigate('/', { replace: true });
    }
  }, [questionnaireId, participantId, accessCode, navigate]);

  useEffect(() => {
    if (answerAck) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  }, [answerAck]);

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion) return;
    submitAnswer(currentQuestion.questionId, answer);
  };


  if (!questionnaire || !currentQuestion) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[var(--text-secondary)]">Esperando pregunta...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout backgroundVariant="gradient">
      <div className="min-h-screen flex flex-col justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              {questionnaire.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {questionnaire.description}
            </p>
            <div className="flex justify-center mt-2">
              <span className="bg-[var(--accent-primary)]/20 px-2 py-1 rounded-full text-xs">
                {currentQuestion.levelName}
              </span>
            </div>
          </motion.div>

          <QuestionCard
            question={currentQuestion.text}
            questionNumber={currentQuestion.position}
            totalQuestions={currentQuestion.total}
          />


          <AnswerButtons
            onAnswer={handleAnswer}
            isVisible={!showFeedback}
            disabled={showFeedback}
          />

          {showFeedback && answerAck && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="w-full flex justify-center"
            >
              <div className={`
                inline-flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-md border
                ${answerAck.is_correct
                  ? 'bg-green-500/10 border-green-500/30 text-green-700'
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
                }
              `}>
                {answerAck.is_correct ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <p className="font-semibold">
                    {answerAck.is_correct ? '¡Correcto!' : '¡Incorrecto!'}
                  </p>
                  <p className="text-sm opacity-80">
                    Tu puntuación actual: {answerAck.score}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
