import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface AnswerAck {
  is_correct: boolean;
  score?: number;
  totalScore?: number;
}

interface AnswerFeedbackProps {
  answerAck: AnswerAck;
  localTotalScore: number;
  isVisible: boolean;
}

export function AnswerFeedback({ answerAck, localTotalScore, isVisible }: AnswerFeedbackProps) {
  if (!isVisible) return null;

  return (
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
            {answerAck.is_correct 
              ? `+${answerAck.score} pts (Total: ${answerAck.totalScore || localTotalScore} pts)` 
              : `Total: ${answerAck.totalScore || localTotalScore} pts`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
