import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuestionnaire } from '@/api/query/quiz.queries';
import { MainLayout } from '@/common/widgets/clients/main-layout.widget';
import { useEventSocketParticipant } from '@/common/hooks/useEventSocket';
import { QuestionCard } from '@/common/atoms/QuestionCard';
import { CheckCircle, XCircle } from 'lucide-react';
import { AnswerButtons } from '@/common/molecules/AnswerButtons';


interface LocationState {
  questionnaireId: number;
  participantId: string;
  accessCode: string;
}

export function QuestionsView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { questionnaireId, participantId, accessCode } = state as LocationState;

  const { data: questionnaire } = useQuestionnaire(questionnaireId);  const {
    currentQuestion,
    answerAck,
    submitAnswer,
    noMoreQuestions,
    eventEnded,
    results,
    eventStarted
  } = useEventSocketParticipant(accessCode, participantId);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);

  useEffect(() => {
    if (!questionnaireId || !participantId || !accessCode) {
      navigate('/', { replace: true });
    }
  }, [questionnaireId, participantId, accessCode, navigate]);  useEffect(() => {
    if (answerAck) {
      setIsWaitingForResponse(false);
      setHasAnsweredCurrentQuestion(true);
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  }, [answerAck]);

  // Reset states when a new question arrives
  useEffect(() => {
    if (currentQuestion && currentQuestion.questionId !== currentQuestionId) {
      setCurrentQuestionId(currentQuestion.questionId);
      setIsWaitingForResponse(false);
      setShowFeedback(false);
      setHasAnsweredCurrentQuestion(false);
    }
  }, [currentQuestion, currentQuestionId]);
  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion || hasAnsweredCurrentQuestion) return;
    setIsWaitingForResponse(true);
    submitAnswer(currentQuestion.questionId, answer);
  };

  if (!questionnaire) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[var(--text-secondary)]">Cargando cuestionario...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Event has started but no question yet
  if (eventStarted && !currentQuestion) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-12 h-12 border-3 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              ¡El evento ha comenzado!
            </h2>
            <p className="text-[var(--text-secondary)]">
              Esperando la primera pregunta del administrador...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // No event started yet or no question
  if (!currentQuestion) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Conectado al evento
            </h2>
            <p className="text-[var(--text-secondary)]">
              Esperando que el administrador inicie el quiz...
            </p>
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
          />          <AnswerButtons
            onAnswer={handleAnswer}
            isVisible={!showFeedback && !isWaitingForResponse && !hasAnsweredCurrentQuestion}
            isWaiting={isWaitingForResponse}
            disabled={showFeedback || isWaitingForResponse || hasAnsweredCurrentQuestion}
          />

          {/* State when user has answered but feedback is hidden */}
          {hasAnsweredCurrentQuestion && !showFeedback && !isWaitingForResponse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex justify-center"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30">
                <CheckCircle className="w-5 h-5 text-[var(--accent-primary)]" />
                <p className="text-sm text-[var(--text-primary)] font-medium">
                  Respuesta enviada - Esperando siguiente pregunta
                </p>
              </div>
            </motion.div>
          )}

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