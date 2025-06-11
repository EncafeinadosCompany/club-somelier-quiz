import { motion } from 'framer-motion';
import { ResultsType } from '@/common/hooks/useEventSocket';

interface QuizResultsProps {
  results: ResultsType[];
  questionnaireTitle: string;
  onGoHome: () => void;
  onShareResults: (results: ResultsType[]) => void;
}

export function QuizResults({ results, questionnaireTitle, onGoHome, onShareResults }: QuizResultsProps) {
  return (
    <div className="max-h-[85vh] overflow-y-auto flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl mx-auto text-center space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">¡Resultados del Quiz!</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Gracias por participar en <span className="font-semibold">{questionnaireTitle}</span>
          </p>
        </motion.div>

        <div className="space-y-6">
          {results.map((result, index) => (
            <motion.div
              key={`result-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--accent-primary)]">
                      {result.participant.fullName.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                    {result.participant.fullName}
                  </h2>
                </div>
                <div className="px-4 py-2 rounded-full bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30">
                  <span className="text-lg font-bold text-[var(--accent-primary)]">
                    {result.total.toFixed(2)} pts
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm text-[var(--text-secondary)]">Puntuación</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {Math.round((result.total))}
                  </span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.round((result.total))}`
                    }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-[var(--accent-primary)] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onGoHome}
            className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
          >
            Volver al inicio
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={() => onShareResults(results)}
            className="px-6 py-3 bg-indigo-300 border border-white/20 text-white rounded-lg hover:bg-indigo-400 transition-colors"
          >
            Compartir resultados
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
