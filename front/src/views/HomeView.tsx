import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import { WelcomeForm } from '../common/widgets/WelcomeForm';
import { motion } from 'framer-motion';
import { useQuestionnaire } from '../api/query/quiz.queries';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export function HomeView() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const { questionnaireId } = useParams<{ questionnaireId: string }>();
  
  const numericQuestionnaireId = questionnaireId ? parseInt(questionnaireId, 10) : null;
  const { data: questionnaire, isLoading: questionnaireLoading, error: questionnaireError } = useQuestionnaire(numericQuestionnaireId!);

  const handleWelcomeComplete = (data: UserData) => {
    setUserData(data);
    
    navigate('/waiting', { 
      state: { 
        userData: data,
        questionnaireId: numericQuestionnaireId
      } 
    });
  };

  if (!questionnaireId) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
        
        </div>
      </MainLayout>
    );
  }

  if (isNaN(parseInt(questionnaireId, 10))) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
          <div className="w-full max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-4"
            >
              <div className="text-6xl">❌</div>
              <h1 className="text-xl font-bold text-red-600">
                ID inválido
              </h1>
              <p className="text-red-600/80">
                El ID del cuestionario debe ser un número válido.
                <br />
                ID recibido: <code className="bg-red-500/20 px-2 py-1 rounded">{questionnaireId}</code>
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Volver atrás
              </button>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (questionnaireError) {
    return (
      <MainLayout backgroundVariant="gradient">
        <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
          <div className="w-full max-w-md text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-4"
            >
              <div className="text-6xl">❌</div>
              <h1 className="text-xl font-bold text-red-600">
                Cuestionario no encontrado
              </h1>
              <p className="text-red-600/80">
                El cuestionario no existe o no está disponible.
              </p>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Volver atrás
              </button>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout backgroundVariant="gradient">
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <div className="w-full max-w-[340px] sm:max-w-md lg:max-w-lg xl:max-w-xl">
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
              rounded-2xl sm:rounded-3xl lg:rounded-3xl
              p-4 sm:p-6 lg:p-8 xl:p-10
              shadow-xl sm:shadow-2xl lg:shadow-3xl
              border border-[var(--border-primary)]/80
              w-full
              relative
              overflow-hidden
            ">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 rounded-2xl sm:rounded-3xl" />
              
              <div className="relative z-10">
                {questionnaireLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 p-4 bg-[var(--surface-secondary)]/50 rounded-xl"
                  >
                    <div className="w-4 h-4 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm text-[var(--text-secondary)]">
                      Validando cuestionario...
                    </p>
                  </motion.div>
                )}

                {questionnaire && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 p-4 bg-[var(--surface-secondary)]/50 rounded-xl space-y-2"
                  >
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">
                      {questionnaire.title}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {questionnaire.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-[var(--text-secondary)]">
                      <span>{questionnaire.questions?.length || 0} preguntas</span>
                      <span>•</span>
                      <span>ID: {questionnaire.id}</span>
                    </div>
                  </motion.div>
                )}

                {!questionnaireLoading && (
                  <WelcomeForm 
                    onComplete={handleWelcomeComplete}
                    className="w-full"
                  />
                )}

                {questionnaireLoading && (
                  <div className="text-center p-4">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Esperando validación del cuestionario...
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-32 sm:h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl hidden sm:block" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 sm:w-24 sm:h-24 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-safe-area-inset-bottom sm:hidden" />
    </MainLayout>
  );
}
