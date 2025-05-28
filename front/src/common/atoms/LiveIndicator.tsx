interface LiveIndicatorProps {
  status: 'online' | 'offline' | 'connecting';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LiveIndicator({ 
  status, 
  text,
  size = 'md',
  className = '' 
}: LiveIndicatorProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const statusConfig = {
    online: {
      color: 'bg-[var(--accent-success)]',
      animation: 'animate-pulse',
      defaultText: 'En línea'
    },
    offline: {
      color: 'bg-[var(--text-tertiary)]',
      animation: '',
      defaultText: 'Desconectado'
    },
    connecting: {
      color: 'bg-[var(--accent-warning)]',
      animation: 'animate-ping',
      defaultText: 'Conectando...'
    }
  };

  const config = statusConfig[status];
  const displayText = text || config.defaultText;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div 
          className={`
            ${sizeClasses[size]} 
            ${config.color}
            rounded-full
          `}
        />
        {config.animation && (
          <div 
            className={`
              absolute inset-0
              ${sizeClasses[size]}
              ${config.color}
              rounded-full
              ${config.animation}
            `}
          />
        )}
      </div>
      {text !== null && (
        <span className={`
          text-[var(--text-tertiary)]
          ${textSizeClasses[size]}
        `}>
          {displayText}
        </span>
      )}
    </div>
  );
}
