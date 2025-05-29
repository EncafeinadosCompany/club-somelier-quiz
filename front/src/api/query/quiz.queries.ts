import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QuizSession, QuizParticipant, QuizStatus } from '../types/quiz.types';

const mockQuizSession: QuizSession = {
  id: 'session-1',
  status: 'waiting',
  participants: []
};

export function useQuizStatus(sessionId?: string) {
  return useQuery({
    queryKey: ['quiz-status', sessionId],
    queryFn: async (): Promise<QuizStatus> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        sessionId: sessionId || 'session-1',
        isActive: false,
        currentQuestion: 0,
        totalQuestions: 5,
        timeRemaining: 0
      };
    },
    enabled: !!sessionId,
    refetchInterval: 2000, 
  });
}

export function useQuizSession(sessionId?: string) {
  return useQuery({
    queryKey: ['quiz-session', sessionId],
    queryFn: async (): Promise<QuizSession> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return mockQuizSession;
    },
    enabled: !!sessionId,
  });
}

export function useJoinQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (participant: Omit<QuizParticipant, 'id' | 'joinedAt' | 'status'>) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newParticipant: QuizParticipant = {
        ...participant,
        id: `participant-${Date.now()}`,
        joinedAt: new Date(),
        status: 'connected'
      };

      return {
        participantId: newParticipant.id,
        sessionId: 'session-1'
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz-session'] });
      queryClient.invalidateQueries({ queryKey: ['quiz-status'] });
    },
  });
}

export function useStartQuizTest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      console.log('🔧 Ejecutando mutación startQuizTest para sessionId:', sessionId);
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      const result = {
        sessionId,
        status: 'active',
        startedAt: new Date()
      };
      console.log('🎉 Mutación completada:', result);
      return result;
    },
    onSuccess: (data) => {
      console.log('🚀 onSuccess ejecutado con data:', data);
      queryClient.setQueryData(['quiz-status', 'session-1'], (old: QuizStatus | undefined) => {
        const newData = {
          ...old,
          sessionId: 'session-1',
          isActive: true,
          currentQuestion: 1,
          totalQuestions: 5,
          timeRemaining: 30
        };
        console.log('📊 Actualizando quiz-status:', newData);
        return newData;
      });
    },
    onError: (error) => {
      console.error('💥 Error en useStartQuizTest:', error);
    }
  });
}
