import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import { Play, CheckCircle, AlertCircle, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { useQuizStatus, useJoinQuiz, useStartQuizTest, useQuestionnaire } from '../api/query/quiz.queries';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface LocationState {
  userData: UserData;
  questionnaireId: number;
}

export function WaitingView() {
  const [sessionId] = useState('session-1');
  const [hasJoined, setHasJoined] = useState(false);
  const [participantId, setParticipantId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const locationState = location.state as LocationState;
  const userData = locationState?.userData;
  const questionnaireId = locationState?.questionnaireId;

  useEffect(() => {
    if (!userData) {
      console.log('❌ No hay datos de usuario, redirigiendo al inicio...');
      navigate('/', { replace: true });
      return;
    }

    if (!questionnaireId) {
      console.log('❌ No hay ID de cuestionario, redirigiendo al inicio...');
      navigate('/', { replace: true });
      return;
    }

    console.log('✅ Datos de usuario recibidos:', userData);
    console.log('📝 ID del cuestionario:', questionnaireId);
  }, [userData, questionnaireId, navigate]);

  const { data: questionnaire, isLoading: questionnaireLoading, error: questionnaireError, refetch: refetchQuestionnaire } = useQuestionnaire(questionnaireId!);
  
  const { data: quizStatus } = useQuizStatus(sessionId);
  const joinQuizMutation = useJoinQuiz();
  const startTestMutation = useStartQuizTest();

  useEffect(() => {
    if (questionnaireError) {
      console.error('❌ Error al cargar cuestionario:', questionnaireError);
    }
    
    if (questionnaire) {
      console.log('📋 Cuestionario cargado exitosamente:', questionnaire);
    }
  }, [questionnaire, questionnaireError]);

  useEffect(() => {
    if (!hasJoined && userData && questionnaire && !joinQuizMutation.isPending) {
      console.log('🔗 Uniéndose al quiz con datos:', userData);
      
      joinQuizMutation.mutate({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        questionnaireId: questionnaire.id
      }, {
        onSuccess: (response) => {
          console.log('✅ Usuario unido al quiz exitosamente:', response);
          setHasJoined(true);
          if (response.participantId) {
            setParticipantId(response.participantId);
            localStorage.setItem('participantId', response.participantId);
          }
        },
        onError: (error) => {
          console.error('❌ Error al unirse al quiz:', error);
          setHasJoined(true);
          const tempId = `temp-participant-${Date.now()}`;
          setParticipantId(tempId);
          localStorage.setItem('participantId', tempId);
        }
      });
    }
  }, [hasJoined, userData, questionnaire, joinQuizMutation]);

  const navigateToQuestions = () => {
    console.log('🚀 Navegando a las preguntas...');
    navigate('/questions', {
      state: {
        questionnaireId: questionnaireId,
        participantId: participantId
      }
    });
  };

  useEffect(() => {
    if (quizStatus?.isActive) {
      console.log('✅ Quiz activado por admin, navegando...');
      navigateToQuestions();
    }
  }, [quizStatus?.isActive]);

  const handleTestStart = () => {
    console.log('🧪 Iniciando cuestionario en modo prueba...');
    
    if (!isConnected) {
      console.log('⚠️ No conectado, navegando directamente...');
      navigateToQuestions();
      return;
    }
    
    startTestMutation.mutate(sessionId, {
      onSuccess: () => {
        console.log('✅ Quiz de prueba iniciado, navegando...');
        navigateToQuestions();
      },
      onError: (error) => {
        console.error('❌ Error al iniciar quiz de prueba:', error);
        console.log('🔄 Navegando de todas formas (modo desarrollo)...');
        navigateToQuestions();
      }
    });
  };

  const handleRetryQuestionnaire = () => {
    console.log('🔄 Reintentando cargar cuestionario...');
    refetchQuestionnaire();
  };

  const isConnected = hasJoined && !joinQuizMutation.isPending;
  const connectionStatus = joinQuizMutation.isError ? 'error' : 
                          joinQuizMutation.isPending ? 'connecting' : 
                          isConnected ? 'connected' : 'disconnected';

  if (!userData || !questionnaireId) {
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

                {questionnaire && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--surface-secondary)]/50 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[var(--accent-primary)]" />
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {questionnaire.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] text-center">
                      {questionnaire.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-[var(--text-secondary)]">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{questionnaire.questions?.length || 0} preguntas</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>•</span>
                        <span>ID: {questionnaire.id}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {questionnaireLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--surface-secondary)]/50 rounded-xl p-4 flex items-center justify-center space-x-2"
                  >
                    <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-[var(--text-secondary)]">Cargando cuestionario...</span>
                  </motion.div>
                )}

                {questionnaireError && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Error al cargar el cuestionario</span>
                    </div>
                    <button
                      onClick={handleRetryQuestionnaire}
                      className="flex items-center justify-center space-x-2 w-full px-3 py-2 bg-red-500/20 text-red-600 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="text-sm">Reintentar</span>
                    </button>
                  </motion.div>
                )}

                {questionnaire && (
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
                      El cuestionario "{questionnaire.title}" comenzará tan pronto como el administrador 
                      inicie la sesión. Por favor, mantén esta pantalla abierta.
                    </p>
                  </motion.div>
                )}

                {questionnaire && (
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
                      disabled={startTestMutation.isPending}
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
                )}
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
