import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-200 ease-in-out
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[var(--accent-primary)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[var(--bg-primary)]
    active:scale-[0.98]
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:transform-none
    touch-action: manipulation
    user-select: none
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]'
  };

  const variantClasses = {
    primary: `
      bg-[var(--accent-primary)]
      hover:bg-[var(--accent-secondary)]
      text-white
      shadow-[var(--shadow-md)]
      hover:shadow-[var(--shadow-lg)]
    `,
    secondary: `
      bg-[var(--surface-secondary)]
      hover:bg-[var(--surface-tertiary)]
      text-[var(--text-primary)]
      border border-[var(--border-primary)]
      hover:border-[var(--border-accent)]
    `,
    outline: `
      bg-transparent
      hover:bg-[var(--surface-secondary)]
      text-[var(--text-primary)]
      border-2 border-[var(--accent-primary)]
      hover:bg-[var(--accent-primary)]
      hover:text-white
    `,
    ghost: `
      bg-transparent
      hover:bg-[var(--surface-secondary)]
      text-[var(--text-secondary)]
      hover:text-[var(--text-primary)]
    `
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
