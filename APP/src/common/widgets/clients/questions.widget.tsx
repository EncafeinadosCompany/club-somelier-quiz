import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ResultsType, useEventSocketParticipant } from '@/common/hooks/useEventSocket';
import { QuestionCard } from '@/common/atoms/QuestionCard';
import { AnswerButtons } from '@/common/molecules/clients/answer-buttons.molecule';
import { ParticipantsRanking } from '@/common/molecules/clients/participants-ranking.molecule';
import { LiveRankingWidget } from '@/common/molecules/clients/live-ranking,molecule';
import { ShareResultsModal } from '@/common/molecules/clients/share-results-modal.molecule';
import { AnswerFeedback } from '@/common/molecules/clients/answer-feedback.molecule';
import { EventStatusMessage } from '@/common/molecules/clients/event-status-message.molecule';
import { QuizResults } from '@/common/molecules/clients/quiz-results.molecule';

interface QuestionsWidgetProps {
  questionnaireId: number;
  participantId: string;
  accessCode: string;
  questionnaire?: {
    title: string;
    description: string;
  };
}

interface ShareOptions {
  show: boolean;
  text: string;
  links: {
    whatsapp: string;
    facebook: string;
    email: string;
  };
}

export function QuestionsWidget({ 
  questionnaireId, 
  participantId, 
  accessCode, 
  questionnaire 
}: QuestionsWidgetProps) {
  const navigate = useNavigate();
  const [shareOptions, setShareOptions] = useState<ShareOptions>({
    show: false,
    text: '',
    links: {
      whatsapp: '',
      facebook: '',
      email: ''
    }
  });

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
  const [localTotalScore, setLocalTotalScore] = useState(0);

  const answeredQuestions = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (isConnected && eventStarted && !currentQuestion && !isRequestingCurrentState) {
      setIsRequestingCurrentState(true);
      requestCurrentQuestion();

      const timeout = setTimeout(() => {
        setIsRequestingCurrentState(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isConnected, eventStarted, currentQuestion, requestCurrentQuestion, isRequestingCurrentState]);

  useEffect(() => {
    if (answerAck && currentQuestionId) {
      setIsWaitingForResponse(false);
      setHasAnsweredCurrentQuestion(true);
      
      if (answerAck.is_correct) {
        setLocalTotalScore(prev => prev + (answerAck.score || 0));
      }
      
      answeredQuestions.current.add(currentQuestionId);

      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }
  }, [answerAck, currentQuestionId]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.questionId !== currentQuestionId) {
      setCurrentQuestionId(currentQuestion.questionId);

      const alreadyAnswered = answeredQuestions.current.has(currentQuestion.questionId);

      setIsWaitingForResponse(false);
      setShowFeedback(false);
      setHasAnsweredCurrentQuestion(alreadyAnswered);
    }
  }, [currentQuestion, currentQuestionId]);

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion || hasAnsweredCurrentQuestion ||
      answeredQuestions.current.has(currentQuestion.questionId)) return;

    setIsWaitingForResponse(true);
    submitAnswer(currentQuestion.questionId, answer);
  };

  const handleShareResults = (data: ResultsType[]) => {
    const sortedResults = [...data].sort((a, b) => b.total - a.total);

    let shareText = `¡He completado el quiz "${questionnaire?.title}"! 🎯\n` 

    shareText += `📊 Resultados finales:\n`;

    sortedResults.forEach((result, index) => {
      const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
      shareText += `${medal} ${result.participant.fullName}: pts ${result.total}\n`;
    });

    shareText += `\n#QuizApp #${questionnaire?.title.replace(/\s+/g, '')}`;

    if (navigator.share) {
      navigator.share({
        title: `Resultados del Quiz "${questionnaire?.title}"`,
        text: shareText,
      }).catch(err => console.error('Error sharing:', err));
      return;
    }

    const encodedText = encodeURIComponent(shareText);

    setShareOptions({
      show: true,
      text: shareText,
      links: {
        whatsapp: `https://wa.me/?text=${encodedText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`,
        email: `mailto:?subject=${encodeURIComponent(`Resultados del Quiz "${questionnaire?.title}"`)}&body=${encodedText}`
      }
    });
  };

  const handleConnectToEvent = () => {
    setIsRequestingCurrentState(true);
    requestCurrentQuestion();
    setTimeout(() => setIsRequestingCurrentState(false), 5000);
  };

  const handleCloseShareModal = () => {
    setShareOptions(prev => ({ ...prev, show: false }));
  };

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  // Loading questionnaire
  if (!questionnaire) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EventStatusMessage
          type="questionnaire-loading"
          title="Cargando cuestionario..."
        />
      </div>
    );
  }

  // Results with share modal
  if (eventEnded && results) {
    return (
      <>
        <QuizResults
          results={results}
          questionnaireTitle={questionnaire.title}
          onGoHome={handleGoHome}
          onShareResults={handleShareResults}
        />
        <ShareResultsModal
          shareOptions={shareOptions}
          onClose={handleCloseShareModal}
        />
      </>
    );
  }

  // Event started but waiting for question
  if (eventStarted && !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EventStatusMessage
          type="connecting"
          title="¡El evento ha comenzado!"
          subtitle={isRequestingCurrentState
            ? "Conectando a la pregunta actual..."
            : "Esperando la siguiente pregunta..."}
          showButton={!isRequestingCurrentState}
          buttonText="Conectar con el evento"
          onButtonClick={handleConnectToEvent}
          isRequestingCurrentState={isRequestingCurrentState}
        />
      </div>
    );
  }

  // Event ended without results
  if (eventEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <EventStatusMessage
            type="ended"
            title="¡El evento ha finalizado!"
            subtitle="Gracias por participar. Los resultados han sido registrados."
          />

          {results.length > 0 && (
            <div className="mt-8">
              <ParticipantsRanking
                participants={results}
                currentParticipantId={participantId}
                title="Resultados finales"
                maxToShow={10}
                showMedals={true}
                animate={true}
              />
            </div>
          )}

          <button
            onClick={handleGoHome}
            className="mx-auto mt-6 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Waiting for event to start
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EventStatusMessage
          type="waiting"
          title="Conectado al evento"
          subtitle="Esperando que el administrador inicie el quiz..."
        />
      </div>
    );
  }

  // Active question
  return (
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
        />

        <AnswerButtons
          onAnswer={handleAnswer}
          isVisible={!showFeedback && !isWaitingForResponse && !hasAnsweredCurrentQuestion}
          isWaiting={isWaitingForResponse}
          disabled={showFeedback || isWaitingForResponse || hasAnsweredCurrentQuestion}
        />

        {hasAnsweredCurrentQuestion && !showFeedback && !isWaitingForResponse && (
          <EventStatusMessage
            type="answered"
            title="Respuesta enviada - Esperando siguiente pregunta"
          />
        )}

        {showFeedback && answerAck && (
          <AnswerFeedback
            answerAck={answerAck}
            localTotalScore={localTotalScore}
            isVisible={showFeedback}
          />
        )}

        {results.length > 0 && (
          <LiveRankingWidget
            participants={results}
            currentParticipantId={participantId}
            maxToShow={5}
          />
        )}
      </div>
    </div>
  );
}
