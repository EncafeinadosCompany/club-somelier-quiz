import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface EventStatusMessageProps {
  type: 'loading' | 'waiting' | 'connecting' | 'answered' | 'ended' | 'questionnaire-loading';
  title: string;
  subtitle?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  isRequestingCurrentState?: boolean;
}

export function EventStatusMessage({ 
  type, 
  title, 
  subtitle, 
  showButton, 
  buttonText, 
  onButtonClick,
  isRequestingCurrentState 
}: EventStatusMessageProps) {
  const getSpinnerSize = () => {
    switch (type) {
      case 'connecting':
        return 'w-12 h-12 border-3';
      case 'ended':
        return 'w-16 h-16';
      default:
        return 'w-8 h-8 border-2';
    }
  };

  const renderIcon = () => {
    if (type === 'ended') {
      return (
        <div className="w-16 h-16 mx-auto bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-[var(--accent-primary)]" />
        </div>
      );
    }

    if (type === 'answered') {
      return <CheckCircle className="w-5 h-5 text-[var(--accent-primary)]" />;
    }

    return (
      <div className={`${getSpinnerSize()} border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto`} />
    );
  };

  const getContainerClasses = () => {
    if (type === 'answered') {
      return "w-full flex justify-center";
    }
    return "text-center space-y-4 max-w-md mx-auto px-4";
  };

  const getContentClasses = () => {
    if (type === 'answered') {
      return "inline-flex items-center space-x-2 px-4 py-3 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30";
    }
    if (type === 'ended') {
      return "space-y-6";
    }
    return "space-y-4";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={getContainerClasses()}
    >
      <div className={getContentClasses()}>
        {renderIcon()}
        
        {type === 'answered' ? (
          <p className="text-sm text-[var(--text-primary)] font-medium">
            {title}
          </p>
        ) : (
          <>
            <h2 className={`font-semibold text-[var(--text-primary)] ${
              type === 'ended' ? 'text-2xl' : type === 'connecting' ? 'text-xl' : 'text-lg'
            }`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-[var(--text-secondary)]">
                {subtitle}
              </p>
            )}
          </>
        )}

        {showButton && !isRequestingCurrentState && (
          <button
            onClick={onButtonClick}
            className="mx-auto mt-4 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary)]/80 transition-colors"
          >
            {buttonText}
          </button>
        )}
      </div>
    </motion.div>
  );
}
