export interface QuizSession {
  id: string;
  status: 'waiting' | 'active' | 'completed';
  adminId?: string;
  startedAt?: Date;
  participants: QuizParticipant[];
}

export interface QuizParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: Date;
  status: 'connected' | 'answering' | 'completed';
}

export interface QuizStatus {
  sessionId: string;
  isActive: boolean;
  currentQuestion?: number;
  totalQuestions?: number;
  timeRemaining?: number;
}
