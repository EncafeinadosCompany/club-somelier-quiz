import { motion } from 'framer-motion';
import { AnswerButton } from '../atoms/AnswerButton';
import { useState } from 'react';

interface AnswerButtonsProps {
  onAnswer: (answer: boolean) => void;
  isVisible?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AnswerButtons({ 
  onAnswer, 
  isVisible = true, 
  disabled = false,
  className = "" 
}: AnswerButtonsProps) {
  const [showButtons, setShowButtons] = useState(false);

  useState(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 800); 

    return () => clearTimeout(timer);
  });

  const handleAnswer = (answer: boolean) => {
    setShowButtons(false);
    setTimeout(() => {
      onAnswer(answer);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        delay: 0.5,
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      className={`
        grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6
        w-full
        ${className}
      `}
    >
      <AnswerButton
        type="no"
        onAnswer={handleAnswer}
        isVisible={showButtons && isVisible}
        delay={0.1}
        disabled={disabled}
      />
      <AnswerButton
        type="yes"
        onAnswer={handleAnswer}
        isVisible={showButtons && isVisible}
        delay={0.2}
        disabled={disabled}
      />
    </motion.div>
  );
}