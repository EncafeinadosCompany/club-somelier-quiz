import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import { CheckCircle, AlertCircle, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { useQuestionnaire } from '../api/query/quiz.queries';
import { Participant } from '@/api/types/participant.type';
import { useEventSocketParticipant } from '@/common/hooks/useEventSocket';

interface LocationState {
    userData: Participant;
    questionnaireId: number;
    accessCode: string;
}

export function WaitingViewTest() {
    /***** URL state *****/
    const { state } = useLocation();
    const { userData, questionnaireId, accessCode } = (state || {}) as LocationState;
    const navigate = useNavigate();

    /***** local state *****/
    const [participantId, setParticipantId] = useState<string | null>(null);

    /***** (1) Redirección temprana si falta info *****/
    useEffect(() => {
        if (!userData || !questionnaireId || !accessCode) {
            navigate('/', { replace: true });
        }
    }, [userData, questionnaireId, accessCode, navigate]);

    /* ---------- Cargar estionario ---------- */
    const {
        data: questionnaire,
        isLoading: questionnaireLoading,
        error: questionnaireError,
        refetch,
    } = useQuestionnaire(questionnaireId!);

    /***** (3) Conexión al socket una vez tenemos IDs *********/
    const socket = useEventSocketParticipant(accessCode, participantId);
    console.log('🔌 Conectando al socket con:', { accessCode, participantId });

    /***** (4) Navegar cuando el admin inicie *********/
    useEffect(() => {
        if (!participantId) return;

        const go = () =>
            navigate('/questions', { state: { questionnaireId, participantId, accessCode } });

        socket.on('event_started', go);
        socket.on('show_question', go);

        return () => {
            socket.off('event_started', go);
            socket.off('show_question', go);
        };
    }, [participantId, questionnaireId, accessCode, navigate]);

    /***** (5) Indicador de conexión *********/
    const connectionStatus = useMemo(() => {
        return socket.connected ? 'connected' : 'connecting';
    }, [socket.connected]);

    /***** (6) handlers extras (prueba y recarga cuestionario) *****/

    const handleRetryQuestionnaire = () => refetch();

    /***** (7) render *********/
    if (!userData || !questionnaireId) return null;

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
