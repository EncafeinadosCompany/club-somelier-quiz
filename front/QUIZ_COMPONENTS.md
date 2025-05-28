# 📋 Componentes Específicos para Cuestionarios

## Componentes de Preguntas

### 1. Pregunta de Opción Múltiple

```tsx
// molecules/MultipleChoiceQuestion.tsx
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  selectedOption?: string;
  onOptionSelect?: (optionId: string) => void;
  showResults?: boolean;
  isDisabled?: boolean;
}

export function MultipleChoiceQuestion({
  question,
  options,
  selectedOption,
  onOptionSelect,
  showResults = false,
  isDisabled = false
}: MultipleChoiceQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--surface-primary)] rounded-xl p-6 border border-[var(--border-primary)]"
    >
      {/* Pregunta */}
      <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-6">
        {question}
      </h3>

      {/* Opciones */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = showResults && option.isCorrect;
          const isWrong = showResults && isSelected && !option.isCorrect;

          return (
            <motion.button
              key={option.id}
              onClick={() => !isDisabled && onOptionSelect?.(option.id)}
              disabled={isDisabled}
              whileTap={{ scale: 0.98 }}
              whileHover={!isDisabled ? { scale: 1.01 } : {}}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                w-full p-4 rounded-lg border-2 text-left
                transition-all duration-300
                ${isSelected 
                  ? showResults
                    ? isCorrect
                      ? 'border-[var(--accent-success)] bg-green-500/10'
                      : 'border-[var(--accent-error)] bg-red-500/10'
                    : 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                  : 'border-[var(--border-primary)] hover:border-[var(--border-accent)]'
                }
                ${isCorrect && showResults && !isSelected 
                  ? 'border-[var(--accent-success)] bg-green-500/5' 
                  : ''
                }
                ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-primary)] font-medium">
                  {option.text}
                </span>
                
                {/* Indicadores */}
                <div className="flex items-center gap-2">
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        ${showResults
                          ? isCorrect
                            ? 'bg-[var(--accent-success)]'
                            : 'bg-[var(--accent-error)]'
                          : 'bg-[var(--accent-primary)]'
                        }
                      `}
                    >
                      <Check size={16} className="text-white" />
                    </motion.div>
                  )}
                  
                  {showResults && isCorrect && !isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-[var(--accent-success)] flex items-center justify-center"
                    >
                      <Check size={16} className="text-white" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
```

### 2. Pregunta de Verdadero/Falso

```tsx
// molecules/TrueFalseQuestion.tsx
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface TrueFalseQuestionProps {
  question: string;
  selectedAnswer?: boolean;
  onAnswerSelect?: (answer: boolean) => void;
  correctAnswer?: boolean;
  showResults?: boolean;
  isDisabled?: boolean;
}

export function TrueFalseQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  correctAnswer,
  showResults = false,
  isDisabled = false
}: TrueFalseQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--surface-primary)] rounded-xl p-6 border border-[var(--border-primary)]"
    >
      {/* Pregunta */}
      <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-6">
        {question}
      </h3>

      {/* Opciones True/False */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: true, label: 'Verdadero', icon: Check, color: 'green' },
          { value: false, label: 'Falso', icon: X, color: 'red' }
        ].map((option) => {
          const isSelected = selectedAnswer === option.value;
          const isCorrect = showResults && correctAnswer === option.value;
          const isWrong = showResults && isSelected && correctAnswer !== option.value;

          return (
            <motion.button
              key={option.label}
              onClick={() => !isDisabled && onAnswerSelect?.(option.value)}
              disabled={isDisabled}
              whileTap={{ scale: 0.95 }}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              className={`
                p-6 rounded-xl border-2 
                flex flex-col items-center gap-3
                transition-all duration-300
                ${isSelected 
                  ? showResults
                    ? isCorrect
                      ? 'border-[var(--accent-success)] bg-green-500/10'
                      : 'border-[var(--accent-error)] bg-red-500/10'
                    : 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                  : 'border-[var(--border-primary)] hover:border-[var(--border-accent)]'
                }
                ${isCorrect && showResults && !isSelected 
                  ? 'border-[var(--accent-success)] bg-green-500/5' 
                  : ''
                }
                ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
              `}
            >
              <option.icon 
                size={32} 
                className={`
                  ${isSelected 
                    ? showResults
                      ? isCorrect ? 'text-[var(--accent-success)]' : 'text-[var(--accent-error)]'
                      : 'text-[var(--accent-primary)]'
                    : 'text-[var(--text-secondary)]'
                  }
                `} 
              />
              <span className="font-semibold text-[var(--text-primary)]">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
```

### 3. Pregunta de Texto Libre

```tsx
// molecules/TextQuestion.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TextQuestionProps {
  question: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  isDisabled?: boolean;
}

export function TextQuestion({
  question,
  placeholder = "Escribe tu respuesta aquí...",
  value = "",
  onChange,
  maxLength = 500,
  isDisabled = false
}: TextQuestionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const remainingChars = maxLength - value.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--surface-primary)] rounded-xl p-6 border border-[var(--border-primary)]"
    >
      {/* Pregunta */}
      <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-6">
        {question}
      </h3>

      {/* Textarea */}
      <motion.div
        animate={{ 
          scale: isFocused ? 1.01 : 1,
          borderColor: isFocused ? 'var(--accent-primary)' : 'var(--border-primary)'
        }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={isDisabled}
          rows={4}
          className="
            w-full p-4 rounded-lg
            bg-[var(--surface-secondary)]
            border border-[var(--border-primary)]
            text-[var(--text-primary)]
            placeholder:text-[var(--text-tertiary)]
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--accent-primary)]
            focus:ring-offset-2
            focus:ring-offset-[var(--bg-primary)]
            transition-colors duration-200
            resize-none
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        />
      </motion.div>

      {/* Contador de caracteres */}
      <div className="flex justify-end mt-2">
        <span className={`
          text-sm 
          ${remainingChars < 50 
            ? 'text-[var(--accent-warning)]' 
            : 'text-[var(--text-tertiary)]'
          }
        `}>
          {remainingChars} caracteres restantes
        </span>
      </div>
    </motion.div>
  );
}
```

## Componentes de Interface

### 4. Barra de Progreso del Quiz

```tsx
// molecules/QuizProgress.tsx
import { motion } from 'framer-motion';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score?: number;
  showScore?: boolean;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  score = 0,
  showScore = false
}: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--surface-primary)] rounded-xl p-4 border border-[var(--border-primary)]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Pregunta {currentQuestion} de {totalQuestions}
        </span>
        {showScore && (
          <span className="text-sm font-semibold text-[var(--accent-primary)]">
            Puntuación: {score}
          </span>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="relative">
        <div className="w-full h-3 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
          />
        </div>
        
        {/* Porcentaje */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-xs font-bold text-[var(--text-primary)] mix-blend-difference">
            {Math.round(progress)}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
```

### 5. Timer del Quiz

```tsx
// molecules/QuizTimer.tsx
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuizTimerProps {
  totalTime: number; // en segundos
  onTimeUp?: () => void;
  isPaused?: boolean;
}

export function QuizTimer({ totalTime, onTimeUp, isPaused = false }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / totalTime) * 100;
  
  const isUrgent = percentage < 20;
  const isWarning = percentage < 50;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        bg-[var(--surface-primary)] rounded-xl p-4 
        border-2 transition-colors duration-300
        ${isUrgent 
          ? 'border-[var(--accent-error)]' 
          : isWarning 
            ? 'border-[var(--accent-warning)]' 
            : 'border-[var(--border-primary)]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icono */}
        <motion.div
          animate={isUrgent ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ 
            duration: 1, 
            repeat: isUrgent ? Infinity : 0 
          }}
        >
          <Clock 
            size={24} 
            className={`
              ${isUrgent 
                ? 'text-[var(--accent-error)]' 
                : isWarning 
                  ? 'text-[var(--accent-warning)]' 
                  : 'text-[var(--accent-primary)]'
              }
            `} 
          />
        </motion.div>

        {/* Tiempo */}
        <div className="flex-1">
          <motion.div
            animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: isUrgent ? Infinity : 0 }}
            className={`
              text-2xl font-mono font-bold
              ${isUrgent 
                ? 'text-[var(--accent-error)]' 
                : isWarning 
                  ? 'text-[var(--accent-warning)]' 
                  : 'text-[var(--text-primary)]'
              }
            `}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>
          
          {/* Barra de progreso circular */}
          <div className="mt-2">
            <div className="w-full h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.3 }}
                className={`
                  h-full rounded-full
                  ${isUrgent 
                    ? 'bg-[var(--accent-error)]' 
                    : isWarning 
                      ? 'bg-[var(--accent-warning)]' 
                      : 'bg-[var(--accent-primary)]'
                  }
                `}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

### 6. Resultado Final del Quiz

```tsx
// widgets/QuizResult.tsx
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Zap } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  timeElapsed: number; // en segundos
  accuracy: number; // porcentaje
  onRestart?: () => void;
  onHome?: () => void;
}

export function QuizResult({
  score,
  totalQuestions,
  timeElapsed,
  accuracy,
  onRestart,
  onHome
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: 'Excelente', color: 'text-[var(--accent-success)]', icon: Trophy };
    if (percentage >= 70) return { level: 'Muy Bien', color: 'text-[var(--accent-primary)]', icon: Target };
    if (percentage >= 50) return { level: 'Bien', color: 'text-[var(--accent-warning)]', icon: Zap };
    return { level: 'Necesitas Mejorar', color: 'text-[var(--accent-error)]', icon: Target };
  };

  const performance = getPerformanceLevel();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[var(--surface-primary)] rounded-xl p-8 border border-[var(--border-primary)] text-center"
    >
      {/* Icono de rendimiento */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto mb-6"
      >
        <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${
          percentage >= 90 ? 'from-green-400 to-green-600' :
          percentage >= 70 ? 'from-blue-400 to-blue-600' :
          percentage >= 50 ? 'from-yellow-400 to-yellow-600' :
          'from-red-400 to-red-600'
        } flex items-center justify-center`}>
          <performance.icon size={40} className="text-white" />
        </div>
      </motion.div>

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-3xl font-bold mb-2 ${performance.color}`}
      >
        {performance.level}
      </motion.h2>

      {/* Puntuación principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="text-6xl font-bold text-[var(--text-primary)] mb-2">
          {percentage}%
        </div>
        <div className="text-[var(--text-secondary)]">
          {score} de {totalQuestions} respuestas correctas
        </div>
      </motion.div>

      {/* Estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
          <Clock className="w-6 h-6 text-[var(--accent-primary)] mx-auto mb-2" />
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            {minutes}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Tiempo</div>
        </div>
        
        <div className="bg-[var(--surface-secondary)] rounded-lg p-4">
          <Target className="w-6 h-6 text-[var(--accent-primary)] mx-auto mb-2" />
          <div className="text-lg font-semibold text-[var(--text-primary)]">
            {Math.round(accuracy)}%
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Precisión</div>
        </div>
      </motion.div>

      {/* Botones de acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          onClick={onRestart}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="
            px-6 py-3 rounded-lg
            bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)]
            text-white font-semibold
            transition-colors duration-200
          "
        >
          Intentar de Nuevo
        </motion.button>
        
        <motion.button
          onClick={onHome}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="
            px-6 py-3 rounded-lg
            bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)]
            text-[var(--text-primary)] font-semibold
            border border-[var(--border-primary)]
            transition-colors duration-200
          "
        >
          Volver al Inicio
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
```

## Uso de los Componentes

```tsx
// views/QuizView.tsx
import { useState } from 'react';
import { MultipleChoiceQuestion } from '../common/molecules/MultipleChoiceQuestion';
import { QuizProgress } from '../common/molecules/QuizProgress';
import { QuizTimer } from '../common/molecules/QuizTimer';
import { QuizResult } from '../common/widgets/QuizResult';

export function QuizView() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: '1',
      text: '¿Cuál es la capital de Francia?',
      options: [
        { id: 'a', text: 'Madrid', isCorrect: false },
        { id: 'b', text: 'París', isCorrect: true },
        { id: 'c', text: 'Londres', isCorrect: false },
        { id: 'd', text: 'Roma', isCorrect: false }
      ]
    }
    // ... más preguntas
  ];

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {!quizCompleted ? (
          <>
            <QuizProgress 
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
            />
            
            <QuizTimer
              totalTime={300} // 5 minutos
              onTimeUp={() => setQuizCompleted(true)}
            />
            
            <MultipleChoiceQuestion
              question={questions[currentQuestion - 1].text}
              options={questions[currentQuestion - 1].options}
              selectedOption={selectedAnswers[questions[currentQuestion - 1].id]}
              onOptionSelect={(optionId) => 
                handleAnswerSelect(questions[currentQuestion - 1].id, optionId)
              }
              showResults={showResults}
            />
          </>
        ) : (
          <QuizResult
            score={8}
            totalQuestions={10}
            timeElapsed={240}
            accuracy={85}
            onRestart={() => window.location.reload()}
            onHome={() => window.location.href = '/'}
          />
        )}
      </div>
    </div>
  );
}
```
