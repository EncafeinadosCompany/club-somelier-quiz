import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ⭐ Agregar esto
import { MainLayout } from '../common/widgets/MainLayout';
import { Clock, Users, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { useQuizStatus, useJoinQuiz, useStartQuizTest } from '../api/query/quiz.queries';

interface WaitingViewProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  onStartQuiz?: () => void; // ⭐ Hacer opcional
}

export function WaitingView({ userData, onStartQuiz }: WaitingViewProps) {
  const [sessionId] = useState('session-1');
  const [hasJoined, setHasJoined] = useState(false);
  const navigate = useNavigate(); 

  // Queries
  const { data: quizStatus, isLoading: statusLoading } = useQuizStatus(sessionId);
  const joinQuizMutation = useJoinQuiz();
  const startTestMutation = useStartQuizTest();

  useEffect(() => {
    if (!hasJoined) {
      joinQuizMutation.mutate({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }, {
        onSuccess: () => {
          setHasJoined(true);
        }
      });
    }
  }, [hasJoined, userData, joinQuizMutation]);

  const navigateToQuestions = () => {
    navigate('/questions');
  };

  useEffect(() => {
    if (quizStatus?.isActive) {
      onStartQuiz?.(); 
      navigateToQuestions();
    }
  }, [quizStatus?.isActive, onStartQuiz]);

  const handleTestStart = () => {
    startTestMutation.mutate(sessionId, {
      onSuccess: () => {
        setTimeout(() => {
          navigateToQuestions();
        }, 1000);
      },
      onError: (error) => {
        console.error('Error al iniciar cuestionario de prueba:', error);
        navigateToQuestions();
      }
    });
  };

  const isConnected = hasJoined && !joinQuizMutation.isPending;
  const connectionStatus = joinQuizMutation.isError ? 'error' : 
                          joinQuizMutation.isPending ? 'connecting' : 
                          isConnected ? 'connected' : 'disconnected';

  return (
    <MainLayout backgroundVariant="gradient">
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <div className="w-full max-w-md lg:max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100, 
              damping: 20 
            }}
            className="relative"
          >
            <div className="
              bg-[var(--surface-primary)]/95 
              backdrop-blur-md 
              rounded-2xl sm:rounded-3xl
              p-6 sm:p-8 lg:p-10
              shadow-xl sm:shadow-2xl
              border border-[var(--border-primary)]/80
              w-full
              relative
              overflow-hidden
              text-center
            ">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 rounded-2xl sm:rounded-3xl" />
              
              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">
                    ¡Hola, {userData.name.split(' ')[0]}! 👋
                  </h1>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                    Tu registro se ha completado exitosamente
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center space-x-2"
                >
                  {connectionStatus === 'connected' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Conectado</span>
                    </>
                  )}
                  {connectionStatus === 'connecting' && (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-[var(--text-secondary)]">Conectando...</span>
                    </>
                  )}
                  {connectionStatus === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Error de conexión</span>
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[var(--accent-primary)]/20 border-t-[var(--accent-primary)] rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--accent-primary)]" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                    Esperando al administrador...
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    El cuestionario "Realidad o Mito" comenzará tan pronto como el administrador 
                    inicie la sesión. Por favor, mantén esta pantalla abierta.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="pt-4 border-t border-[var(--border-primary)]/30"
                >
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Modo de prueba - Solo para desarrollo
                  </p>
                  <button
                    onClick={handleTestStart}
                    disabled={startTestMutation.isPending || !isConnected}
                    className="
                      w-full sm:w-auto px-6 py-3 
                      bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
                      text-white font-medium rounded-xl
                      hover:shadow-lg hover:scale-105
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                      transition-all duration-200
                      flex items-center justify-center space-x-2
                      min-h-[44px] touch-manipulation
                    "
                  >
                    {startTestMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Iniciando...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Iniciar Cuestionario (Prueba)</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>

              <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-32 sm:h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 sm:w-24 sm:h-24 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
