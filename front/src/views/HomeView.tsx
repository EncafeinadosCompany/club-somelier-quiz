import { MainLayout } from '../common/widgets/MainLayout';
import { WelcomeForm } from '../common/widgets/WelcomeForm';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export function HomeView() {
  const handleWelcomeComplete = (userData: UserData) => {
    console.log('Usuario registrado:', userData);
  };

  return (
    <MainLayout backgroundVariant="gradient">
      <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <WelcomeForm 
            onComplete={handleWelcomeComplete}
            className="
              bg-[var(--surface-primary)]/95 
              backdrop-blur-sm 
              rounded-xl sm:rounded-2xl 
              p-6 sm:p-8 lg:p-10
              shadow-lg sm:shadow-xl lg:shadow-2xl 
              border border-[var(--border-primary)]
              w-full
            "
          />
        </div>
      </div>
    </MainLayout>
  );
}
