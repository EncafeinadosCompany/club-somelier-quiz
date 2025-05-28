import { MainLayout } from '../common/widgets/MainLayout';
import { WelcomeForm } from '../common/widgets/WelcomeForm';
import { motion } from 'framer-motion';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export function HomeView() {
  const handleWelcomeComplete = (userData: UserData) => {
    console.log('Usuario registrado:', userData);
    // navigate.push('/questions')
    window.location.href = '/Questions'; 
  };

  return (
    <MainLayout backgroundVariant="gradient">
      {/* Container responsive con altura mínima optimizada para móvil */}
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
            {/* Card principal con glassmorphism optimizado para móvil */}
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
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5 rounded-2xl sm:rounded-3xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <WelcomeForm 
                  onComplete={handleWelcomeComplete}
                  className="w-full"
                />
              </div>

              {/* Decorative elements - hidden on very small screens */}
              <div className="absolute -top-10 -right-10 w-20 h-20 sm:w-32 sm:h-32 bg-[var(--accent-primary)]/10 rounded-full blur-2xl hidden sm:block" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 sm:w-24 sm:h-24 bg-[var(--accent-secondary)]/10 rounded-full blur-2xl hidden sm:block" />
            </div>

            {/* Mobile-specific floating action area */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent pointer-events-none">
              <div className="h-8" /> {/* Spacer for safe area */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile enhancement: Safe area bottom spacing */}
      <div className="h-safe-area-inset-bottom sm:hidden" />
    </MainLayout>
  );
}
