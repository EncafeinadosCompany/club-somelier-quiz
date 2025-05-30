import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import { QuestionCard } from '../common/atoms/QuestionCard';
import { AnswerButtons } from '../common/molecules/AnswerButtons';
import { useQuestionnaire, useSubmitQuizAnswers } from '../api/query/quiz.queries';
import { QuestionnaireQuestion, UserAnswer } from '../api/types/quiz.types';
import { CheckCircle, XCircle } from 'lucide-react';

interface LocationState {
  questionnaireId: number;
  participantId: string;
}

export function QuestionsView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState;
  const questionnaireId = locationState?.questionnaireId || 1;
  const participantId = locationState?.participantId || localStorage.getItem('participantId') || `participant-${Date.now()}`;

  const { data: questionnaire, isLoading, error } = useQuestionnaire(questionnaireId);
  const submitAnswersMutation = useSubmitQuizAnswers();

  const questions = questionnaire?.questions?.sort((a, b) => a.position - b.position) || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  useEffect(() => {
    if (!questionnaireId || !participantId) {
      console.log('❌ Faltan datos necesarios, redirigiendo al inicio...');
      navigate('/', { replace: true });
      return;
    }

    if (questionnaire) {
    }
  }, [questionnaire, questions.length, participantId, questionnaireId, navigate]);
  const handleAnswer = (answer: boolean) => {
    if (isTransitioning || !currentQuestion) return;

    setIsTransitioning(true);
    
    const isCorrect = answer === currentQuestion.response;
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    const answerData: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      correct: isCorrect
    };

    const newAnswers = [...answers, answerData];
    setAnswers(newAnswers);
    
    console.log('🎯 Respuesta:', {
      question: currentQuestion.question,
      userAnswer: answer ? 'Realidad' : 'Mito',
      correctAnswer: currentQuestion.response ? 'Realidad' : 'Mito',
      isCorrect,
      level: currentQuestion.levelName
    });

    // Mostrar feedback por 2 segundos antes de continuar
    setTimeout(() => {
      setShowFeedback(false);
      
      if (isLastQuestion) {
        // Enviar todas las respuestas al completar el cuestionario
        console.log('🏁 Cuestionario completado, enviando respuestas...');
        
        submitAnswersMutation.mutate({
          participantId,
          questionnaireId: questionnaire!.id,
          answers: newAnswers
        }, {
          onSuccess: (result) => {
            console.log('🎉 Resultado del cuestionario:', result);
            // TODO: Navegar a página de resultados con el resultado
            // navigate('/results', { state: { result } });
            alert(`¡Cuestionario completado!\nPuntuación: ${result.score}/${result.totalQuestions} (${result.percentage}%)`);
          },
          onError: (error) => {
            console.error('❌ Error al enviar respuestas:', error);
            alert('Error al enviar las respuestas. Por favor, inténtalo de nuevo.');
          }
        });
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsTransitioning(false);
          setLastAnswerCorrect(null);
        }, 300);
      }
    }, 2000);
  };

  // Mostrar loading
  if (isLoading) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[var(--text-secondary)]">Cargando preguntas...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Mostrar error
  if (error || !questionnaire || questions.length === 0) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-red-500">Error al cargar las preguntas</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg"
            >
              Reintentar
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }



  return (
    <MainLayout backgroundVariant="gradient">
      <div className="min-h-screen  flex flex-col justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2 sm:space-y-3"
          >
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--text-primary)]">
              {questionnaire.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              {questionnaire.description}
            </p>
            {currentQuestion && (
              <div className="flex items-center justify-center space-x-2 text-xs text-[var(--text-secondary)]">
                <span className="bg-[var(--accent-primary)]/20 px-2 py-1 rounded-full">
                  {currentQuestion.levelName}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            key={`question-${currentQuestion?.id || 0}`}
            className="w-full"
          >
            <QuestionCard
              question={currentQuestion?.question || ''}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />
          </motion.div>          <motion.div
            key={`answers-${currentQuestion?.id || 0}`}
            className="w-full"
          >
            <AnswerButtons
              onAnswer={handleAnswer}
              isVisible={!isTransitioning}
              disabled={isTransitioning || showFeedback}
            />
          </motion.div>

          {/* Feedback de respuesta */}
          {showFeedback && lastAnswerCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="w-full flex justify-center"
            >
              <div className={`
                inline-flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-md border
                ${lastAnswerCorrect 
                  ? 'bg-green-500/10 border-green-500/30 text-green-700' 
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
                }
              `}>
                {lastAnswerCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <div className="text-center">
                  <p className="font-semibold text-base">
                    {lastAnswerCorrect ? '¡Correcto!' : '¡Incorrecto!'}
                  </p>
                  <p className="text-sm opacity-80">
                    La respuesta era: {currentQuestion?.response ? 'Realidad' : 'Mito'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {isTransitioning && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-[var(--surface-secondary)]/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[var(--border-primary)]">
                <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-[var(--text-secondary)]">
                  {isLastQuestion ? (submitAnswersMutation.isPending ? 'Enviando respuestas...' : 'Procesando resultado...') : 'Siguiente pregunta...'}
                </span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
