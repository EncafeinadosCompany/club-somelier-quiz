import { useEffect, useState, useRef } from 'react';
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

  const { data: questionnaire } = useQuestionnaire(questionnaireId);
  
  const {
    currentQuestion,
    answerAck,
    submitAnswer,
    noMoreQuestions,
    eventEnded,
    results,
    eventStarted,
    isConnected,
    requestCurrentQuestion
  } = useEventSocketParticipant(accessCode, participantId);
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [hasAnsweredCurrentQuestion, setHasAnsweredCurrentQuestion] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [isRequestingCurrentState, setIsRequestingCurrentState] = useState(false);
  
  // Registro de preguntas respondidas
  const answeredQuestions = useRef<Set<number>>(new Set());

  // Solicitar la pregunta actual cuando estamos conectados pero no tenemos pregunta
  useEffect(() => {
    if (isConnected && eventStarted && !currentQuestion && !isRequestingCurrentState) {
      setIsRequestingCurrentState(true);
      requestCurrentQuestion();
      
      const timeout = setTimeout(() => {
        setIsRequestingCurrentState(false);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [isConnected, eventStarted, currentQuestion, requestCurrentQuestion]);

  // Validación de parámetros de ruta
  useEffect(() => {
    if (!questionnaireId || !participantId || !accessCode) {
      navigate('/', { replace: true });
    }
  }, [questionnaireId, participantId, accessCode, navigate]);
  
  // Manejo de confirmación de respuesta
  useEffect(() => {
    if (answerAck && currentQuestionId) {
      setIsWaitingForResponse(false);
      setHasAnsweredCurrentQuestion(true);
      
      // Guardar la pregunta en el registro de respondidas
      answeredQuestions.current.add(currentQuestionId);
      
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  }, [answerAck, currentQuestionId]);

  // Reset de estados cuando llega una nueva pregunta
  useEffect(() => {
    if (currentQuestion && currentQuestion.questionId !== currentQuestionId) {
      setCurrentQuestionId(currentQuestion.questionId);
      
      // Verificar si ya respondimos esta pregunta antes
      const alreadyAnswered = answeredQuestions.current.has(currentQuestion.questionId);
      
      setIsWaitingForResponse(false);
      setShowFeedback(false);
      setHasAnsweredCurrentQuestion(alreadyAnswered);
    }
  }, [currentQuestion, currentQuestionId]);
  
  // Manejo de respuesta del usuario
  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion || hasAnsweredCurrentQuestion || 
        answeredQuestions.current.has(currentQuestion.questionId)) return;
    
    setIsWaitingForResponse(true);
    submitAnswer(currentQuestion.questionId, answer);
  };

  // Estados de carga y espera
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
              {isRequestingCurrentState 
                ? "Conectando a la pregunta actual..." 
                : "Esperando la siguiente pregunta..."}
            </p>
            
            {!isRequestingCurrentState && (
              <button 
                onClick={() => {
                  setIsRequestingCurrentState(true);
                  requestCurrentQuestion();
                  setTimeout(() => setIsRequestingCurrentState(false), 5000);
                }}
                className="mx-auto mt-4 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
              >
                Conectar con el evento
              </button>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }

  if (eventEnded) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="w-16 h-16 mx-auto bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[var(--accent-primary)]" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                ¡El evento ha finalizado!
              </h2>
              <p className="text-[var(--text-secondary)]">
                Gracias por participar. Los resultados han sido registrados.
              </p>
            </div>
            
            {results.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Resultados finales</h3>
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
                  <div className="space-y-3">
                    {results.slice(0, 10).map((result, index) => (
                      <div 
                        key={result.participant_id} 
                        className={`flex justify-between items-center p-2 rounded-lg ${
                          result.participant_id === participantId 
                          ? 'bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20' 
                          : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {index + 1}.
                          </span>
                          <span>
                            {result.participant?.fullName || 'Participante'}
                          </span>
                        </div>
                        <span className="font-bold">
                          {Math.round(result.total * 10) / 10} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => navigate('/', { replace: true })}
              className="mx-auto mt-6 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

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