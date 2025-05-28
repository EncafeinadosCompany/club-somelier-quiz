import { MainLayout } from '../common/widgets/MainLayout';
import { Button } from '../common/atoms/Button';
import { LiveIndicator } from '../common/atoms/LiveIndicator';

export function HomeView() {
  return (
    <MainLayout backgroundVariant="gradient">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
        <div className="max-w-md w-full space-y-6">
          <div className="space-y-2">
            <h1 className="text-[var(--text-primary)] font-bold tracking-tight">
              Sistema de Cuestionarios
            </h1>
            <p className="text-[var(--text-secondary)] text-base">
              Aplicación en tiempo real optimizada para móviles
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">
                Tema Configurable
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Toca el botón en la esquina superior derecha para cambiar entre modo oscuro y claro
              </p>
            </div>
            
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">
                Diseño Móvil-First
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Optimizado para dispositivos móviles con targets táctiles de 44px mínimo
              </p>
            </div>
            
            <div className="bg-[var(--surface-tertiary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-[var(--shadow-md)]">
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">
                Arquitectura Atómica
              </h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Estructura organizada en átomos, moléculas, widgets y vistas
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="primary" size="md" fullWidth>
              Comenzar Cuestionario
            </Button>
            <Button variant="secondary" size="md" fullWidth>
              Panel de Administrador
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <LiveIndicator 
            status="online" 
            text="Sistema listo para cuestionarios en tiempo real"
            size="md"
          />
        </div>
      </div>
    </MainLayout>
  );
}
