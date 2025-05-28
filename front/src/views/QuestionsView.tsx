import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '../common/widgets/MainLayout';
import { QuestionCard } from '../common/atoms/QuestionCard';
import { AnswerButtons } from '../common/molecules/AnswerButtons';

interface Question {
  id: number;
  text: string;
}

const mockQuestions: Question[] = [
  { id: 1, text: "¿Los humanos solo usan el 10% de su cerebro?" },
  { id: 2, text: "¿La Gran Muralla China es visible desde el espacio?" },
  { id: 3, text: "¿Los toros se enfurecen al ver el color rojo?" },
  { id: 4, text: "¿Las personas pueden morir de un susto?" },
  { id: 5, text: "¿Los peces dorados tienen memoria de 3 segundos?" }
];

export function QuestionsView() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const totalQuestions = mockQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswer = (answer: boolean) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setAnswers(prev => [...prev, answer]);

    setTimeout(() => {
      if (isLastQuestion) {
        console.log('Cuestionario completado:', answers);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }
    }, 1000);
  };

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
              Realidad o Mito
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Responde con honestidad cada pregunta
            </p>
          </motion.div>

          <motion.div
            key={`question-${currentQuestion.id}`}
            className="w-full"
          >
            <QuestionCard
              question={currentQuestion.text}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />
          </motion.div>

          <motion.div
            key={`answers-${currentQuestion.id}`}
            className="w-full"
          >
            <AnswerButtons
              onAnswer={handleAnswer}
              isVisible={!isTransitioning}
              disabled={isTransitioning}
            />
          </motion.div>

          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-[var(--surface-secondary)]/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[var(--border-primary)]">
                <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-[var(--text-secondary)]">
                  {isLastQuestion ? 'Finalizando...' : 'Siguiente pregunta...'}
                </span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
