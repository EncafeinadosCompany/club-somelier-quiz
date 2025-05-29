import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import {  Play, CheckCircle, AlertCircle } from 'lucide-react';
import { useQuizStatus, useJoinQuiz, useStartQuizTest } from '../api/query/quiz.queries';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export function WaitingView() {
  const [sessionId] = useState('session-1');
  const [hasJoined, setHasJoined] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const userData = location.state?.userData as UserData;

  useEffect(() => {
    if (!userData) {
      console.log('❌ No hay datos de usuario, redirigiendo al inicio...');
      navigate('/', { replace: true });
      return;
    }
    console.log('✅ Datos de usuario recibidos:', userData);
  }, [userData, navigate]);
  const { data: quizStatus, isLoading: statusLoading } = useQuizStatus(sessionId);
  const joinQuizMutation = useJoinQuiz();
  const startTestMutation = useStartQuizTest();
  useEffect(() => {
    if (!hasJoined && userData && !joinQuizMutation.isPending) {
      console.log('🔗 Uniéndose al quiz con datos:', userData);
      joinQuizMutation.mutate({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }, {
        onSuccess: () => {
          console.log('✅ Usuario unido al quiz exitosamente');
          setHasJoined(true);
        },
        onError: (error) => {
          console.error('❌ Error al unirse al quiz:', error);
          setHasJoined(true);
        }
      });
    }
  }, [hasJoined, userData?.name, userData?.email, userData?.phone, joinQuizMutation.isPending]);

  const navigateToQuestions = () => {
    console.log('🚀 Navegando a las preguntas...');
    navigate('/questions');
  };

  useEffect(() => {
    if (quizStatus?.isActive) {
      console.log('✅ Quiz activado por admin, navegando...');
      navigateToQuestions();
    }
  }, [quizStatus?.isActive]);
  const handleTestStart = () => {
    console.log('🧪 Iniciando cuestionario en modo prueba...');
    console.log('📊 Estado actual - isConnected:', isConnected, 'isPending:', startTestMutation.isPending);
    
    if (!isConnected) {
      console.log('⚠️ No conectado, no se puede iniciar el quiz');
      return;
    }
    
    startTestMutation.mutate(sessionId, {
      onSuccess: (data) => {
        console.log('✅ Mutación exitosa:', data);
        console.log('🎯 Navegando inmediatamente...');
        navigateToQuestions();
      },
      onError: (error) => {
        console.error('❌ Error al iniciar cuestionario:', error);
        console.log('🔄 Navegando de todas formas para pruebas (modo desarrollo)...');
        navigateToQuestions();
      }
    });
  };
  const isConnected = hasJoined && !joinQuizMutation.isPending;
  const connectionStatus = joinQuizMutation.isError ? 'error' : 
   joinQuizMutation.isPending ? 'connecting' : 
   isConnected ? 'connected' : 'disconnected';

  if (!userData) {
    return null;
  }

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
