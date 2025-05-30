import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from '../common/widgets/MainLayout';
import { Play, CheckCircle, AlertCircle, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { useQuizStatus,  useStartQuizTest, useQuestionnaire } from '../api/query/quiz.queries';

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

  
}
